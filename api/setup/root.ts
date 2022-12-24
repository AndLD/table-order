import { GraphQLError } from 'graphql'
import { isAuthorized } from '../middlewares/auth'
import { firebaseService } from '../services/firebase'
import { errors, rootUser } from '../utils/constants'
import { IAuthPostBody } from '../utils/interfaces/auth'
import { ITablePostBody } from '../utils/interfaces/table'
import { IUserState } from '../utils/interfaces/user'
import { createJwt } from '../utils/jwt'

export const root = {
    async getAllTables(parent: any, args: any, context: any) {
        isAuthorized(parent, args, context)

        const [modelResult, modelError] = await firebaseService.query({ collection: 'tables', action: 'get' })

        if (modelError) {
            throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
        }

        if (!modelResult?.length) {
            return []
        }

        return modelResult
    },
    async getAllOrders() {
        const [modelResult, modelError] = await firebaseService.query({ collection: 'tables', action: 'get' })

        if (modelError) {
            throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
        }

        if (!modelResult?.length) {
            return []
        }

        return modelResult
    },
    getIsAuthorized(parent: any, args: any, context: any) {
        return !!isAuthorized(parent, args, context)
    },
    login(parent: any, args: any, context: any) {
        try {
            const body: IAuthPostBody = args.req.body.variables.input

            const isValid = body.username === 'root' && body.password === rootUser.password

            if (!isValid) {
                throw errors.CREDENTIALS_INVALID
            }

            // JWT
            const userState: IUserState = {
                username: body.username
            }

            return createJwt(userState)
        } catch (err) {
            throw new GraphQLError(`${errors.INTERNAL_SERVER_ERROR.msg} ${errors.INTERNAL_SERVER_ERROR.code}`)
        }
    },
    async createTable(parent: any, args: any, context: any) {
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
}

function getRandomNumber(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}
