import { getLogger } from '../utils/logger'
import jwt from 'jsonwebtoken'
import { accessJwtSecret } from '../utils/jwt'
import { errors } from '../utils/constants'

const logger = getLogger('middlewares/auth')

export async function isAuthorized(parent: any, args: any, context: any) {
    const authorizationHeader = args.req.headers.authorization

    if (!authorizationHeader?.length) {
        return false
    }

    const token: string = authorizationHeader.split(' ')[1] as string

    try {
        const decodeValue: any = jwt.verify(token, accessJwtSecret)

        // TODO: Validate decodeValue ?

        args.req.user = decodeValue.user

        return args
    } catch (e) {
        logger.error(e)
        return {
            __typename: 'InternalServerError',
            message: errors.JWT_INVALID.msg
        }
    }
}
