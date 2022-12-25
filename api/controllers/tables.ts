import { GraphQLError } from 'graphql'
import { isAuthorized } from '../middlewares/auth'
import { firebaseService } from '../services/firebase'
import { getRandomNumber } from '../utils/common'
import { ITablePostBody, ITablePutBody } from '../utils/interfaces/table'

async function getAllTables(parent: any, args: any, context: any) {
    isAuthorized(parent, args, context)

    const [modelResult, modelError] = await firebaseService.query({ collection: 'tables', action: 'get' })

    if (modelError) {
        throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
    }

    if (!modelResult?.length) {
        return []
    }

    return modelResult
}

async function createTable(parent: any, args: any, context: any) {
    isAuthorized(parent, args, context)

    const body: ITablePostBody = args.req.body.variables.input

    const table = {
        number: getRandomNumber(0, 9999),
        ...body
    }

    const [modelResult, modelError] = await firebaseService.query({
        collection: 'tables',
        action: 'add',
        obj: table
    })

    if (modelError) {
        throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
    }

    return modelResult
}

async function updateTable(parent: any, args: any, context: any) {
    isAuthorized(parent, args, context)

    const tableId: string = args.req.body.variables.id
    const body: ITablePutBody = args.req.body.variables.input

    const [modelResult, modelError] = await firebaseService.query({
        collection: 'tables',
        action: 'update',
        docId: tableId,
        obj: body
    })

    if (modelError) {
        throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
    }

    return modelResult
}

async function deleteTable(parent: any, args: any, context: any) {
    isAuthorized(parent, args, context)

    const tableId: string = args.req.body.variables.id

    const [_, modelError] = await firebaseService.query({
        collection: 'tables',
        action: 'delete',
        docId: tableId
    })

    if (modelError) {
        throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
    }

    return true
}

export const tableControllers = {
    getAllTables,
    createTable,
    updateTable,
    deleteTable
}
