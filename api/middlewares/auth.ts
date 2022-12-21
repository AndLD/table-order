import { getLogger } from '../utils/logger'
import jwt from 'jsonwebtoken'
import { accessJwtSecret } from '../utils/jwt'
import { errors } from '../utils/constants'
import { GraphQLArgs } from 'graphql'

const logger = getLogger('middlewares/auth')

export async function isAuthorized(parent: any, args: GraphQLArgs, context: any) {
    if (!context.request.headers.authorization) {
        return false
    }

    const token: string = context.request.headers.authorization.split(' ')[1] as string

    console.log(token)
    try {
        const decodeValue: any = jwt.verify(token, accessJwtSecret)

        // TODO: Validate decodeValue ?

        context.request.user = decodeValue.user

        return context
    } catch (e) {
        logger.error(e)
        return {
            __typename: 'InternalServerError',
            message: errors.JWT_INVALID.msg
        }
    }
}
