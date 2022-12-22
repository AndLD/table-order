import { isAuthorized } from '../middlewares/auth'
import { errors, rootUser } from '../utils/constants'
import { IAuthPostBody } from '../utils/interfaces/auth'
import { IUserState } from '../utils/interfaces/user'
import { createJwt } from '../utils/jwt'

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
        const body: IAuthPostBody = args.req.body

        const isValid = body.username === 'root' && body.password === rootUser.password

        if (!isValid) {
            throw errors.CREDENTIALS_INVALID
        }

        // JWT
        const userState: IUserState = {
            username: args.req.user.username
        }

        const tokens = createJwt(userState)

        context.response.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })

        return tokens.accessToken
    },
    logout(parent: any, args: any, context: any) {
        context.response.clearCookie('refresh_token')
        return true
    }
}
