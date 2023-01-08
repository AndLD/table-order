import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
import { errors } from '../utils/constants'
import { accessJwtSecret } from '../utils/jwt'

export function isAuthorized(parent: any, args: any, context: any) {
    const authorizationHeader = args.req.headers.authorization

    if (!authorizationHeader?.length) {
        throw new GraphQLError(`${errors.JWT_INVALID.msg} ${errors.JWT_INVALID.code}`)
    }

    try {
        const token: string = authorizationHeader.split(' ')[1] as string

        const decodeValue: any = jwt.verify(token, accessJwtSecret)

        args.req.user = decodeValue.user

        return true
    } catch (e) {
        throw new GraphQLError(`${errors.JWT_INVALID.msg} ${errors.JWT_INVALID.code}`)
    }
}
