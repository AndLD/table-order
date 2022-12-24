import { GraphQLError } from 'graphql'
import { isAuthorized } from '../middlewares/auth'
import { errors, rootUser } from '../utils/constants'
import { IAuthPostBody } from '../utils/interfaces/auth'
import { IUserState } from '../utils/interfaces/user'
import { createJwt } from '../utils/jwt'

export const root = {
    getAllTables(parent: any, args: any, context: any) {
        isAuthorized(parent, args, context)

        return [
            {
                id: 'dsfgfhd',
                number: 1,
                seats: 3,
                shape: 'rectangular',
                height: 100,
                width: 200,
                x: 0,
                y: 0
            }
        ]
    },
    getAllOrders() {},
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
    createTable(parent: any, args: any, context: any) {}
}
