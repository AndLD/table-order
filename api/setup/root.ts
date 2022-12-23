import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
import { isAuthorized } from '../middlewares/auth'
import { errors, rootUser } from '../utils/constants'
import { IAuthPostBody } from '../utils/interfaces/auth'
import { IUserState } from '../utils/interfaces/user'
import { createJwt, refreshJwtSecret } from '../utils/jwt'

interface IRefreshJwtPayload extends jwt.JwtPayload {
    user: IUserState
}

export const root = {
    getAllTables() {
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
        return new Promise((resolve, reject) => {
            isAuthorized(parent, args, context).then((result) => {
                resolve(!!result)
            })
        })
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

            const tokens = createJwt(userState)

            args.res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })

            return tokens.accessToken
        } catch (err) {
            throw new GraphQLError(`${errors.INTERNAL_SERVER_ERROR.msg} ${errors.INTERNAL_SERVER_ERROR.code}`)
        }
    },
    logout(parent: any, args: any, context: any) {
        try {
            args.response.clearCookie('refresh_token')
            return true
        } catch (err) {
            throw new GraphQLError(`${errors.INTERNAL_SERVER_ERROR.msg} ${errors.INTERNAL_SERVER_ERROR.code}`)
        }
    },
    refresh(parent: any, args: any, context: any) {
        const refreshToken = args.req.cookies.refresh_token

        if (!refreshToken) {
            throw new GraphQLError(
                `${errors.UNABLE_TO_REFRESH_ACCESS_JWT.msg} ${errors.UNABLE_TO_REFRESH_ACCESS_JWT.code}`
            )
        }

        // TODO: Investigate cases when jwt.verify can return a string ?
        try {
            var decodeValue: IRefreshJwtPayload = jwt.verify(refreshToken, refreshJwtSecret) as IRefreshJwtPayload
        } catch (e) {
            throw new GraphQLError(
                `${errors.UNABLE_TO_REFRESH_ACCESS_JWT.msg} ${errors.UNABLE_TO_REFRESH_ACCESS_JWT.code}`
            )
        }
        if (!decodeValue?.user) {
            throw new Error('decodeValue.user is empty!')
        }

        const userState: IUserState = {
            username: 'root'
        }

        const tokens = createJwt(userState)

        args.res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })

        return tokens.accessToken
    }
}
