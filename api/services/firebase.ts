import admin from 'firebase-admin'
import { Collection, Error, ModelResult, ServiceAccount } from '../utils/types'
import { Any, DefaultResult, Filter, ModelAction, ModelArgs } from '../utils/types'
import { errors } from '../utils/constants'
import { getLogger } from '../utils/logger'

const logger = getLogger('services/firebase')

let db: admin.firestore.Firestore | undefined
let documentId: admin.firestore.FieldPath | undefined

async function init() {
    if (process.env.CLIENT_EMAIL && process.env.PRIVATE_KEY && process.env.PROJECT_ID) {
        admin.initializeApp({
            credential: admin.credential.cert({
                clientEmail: process.env.CLIENT_EMAIL,
                privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
                projectId: process.env.PROJECT_ID
            } as ServiceAccount)
        })
        logger.info('Firebase successfully connected')

        db = admin.firestore()
        documentId = admin.firestore.FieldPath.documentId()

        return db
    }

    throw 'Firebase configs not found in ".env"!'
}

async function getInstance(): Promise<admin.firestore.Firestore> {
    return db || init()
}

async function query({ collection, where, docId, action, obj }: ModelArgs): Promise<DefaultResult> {
    validateModelArgs({ where, docId, action })

    let result, error

    const queryRef = await prepareQueryRef({ collection, where, docId, action })

    // Making request
    const firebaseRes = await queryRef[action](obj)

    ;[result, error] = await proccessFirebaseRes(firebaseRes, collection, docId, action, result)

    if (error) return [null, error] as DefaultResult
    else return [result, null] as DefaultResult
}

// ! Валидировать все аргументы функции
const validateModelArgs = ({ where, docId, action }: { where?: Filter[]; docId?: string; action: ModelAction }) => {
    if (!['get', 'add', 'update', 'delete'].includes(action)) throw 'validateModelArgs: Incorrect action'
    if (['add', 'update', 'delete'].includes(action) && where) throw 'validateModelArgs: Incorrect mix: action & where'
    if ((action == 'update' || action == 'delete') && !docId)
        throw `validateModelArgs: Missing docId during "${action}" action`
}

const prepareQueryRef = async ({
    collection,
    where,
    docId,
    action
}: {
    collection: string
    where?: Filter[]
    docId?: string
    action: ModelAction
}) => {
    let queryRef: any = (await getInstance()).collection(collection)

    // PUT & DELETE
    if (action == 'update' || action == 'delete') queryRef = queryRef.doc(docId)
    else if (docId) queryRef = queryRef.where(documentId, '==', docId)

    // GET
    if (where && action == 'get') for (const whereArgs of where) queryRef = queryRef.where(...whereArgs)

    return queryRef
}

// Processing firebase response for different types of actions
async function proccessFirebaseRes(
    firebaseRes: Any,
    collection: Collection,
    docId: string | undefined,
    action: ModelAction,
    result: any
) {
    let error

    if (!result) result = []

    switch (action) {
        case 'get':
            firebaseRes.forEach((doc: Any) => {
                if (docId)
                    result = {
                        id: doc.id,
                        ...doc.data()
                    }
                else
                    result.push({
                        id: doc.id,
                        ...doc.data()
                    })
            })
            break
        case 'add':
            result = firebaseRes.path.split('/')
            const id = result[result.length - 1]
            ;[result, error] = await firebaseService.query({ collection, docId: id, action: 'get' })
            if (error) return [null, error]
            break
        case 'update':
            ;[result, error] = await firebaseService.query({ collection, docId, action: 'get' })
            if (error) return [null, error]
            break
        case 'delete':
            break
    }

    return [Array.isArray(result) ? (result.length > 0 ? result : null) : result, null]
}

export const firebaseService = {
    init,
    query
}
