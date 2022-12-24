import jwt from 'jsonwebtoken'
import { accessJwtSecret } from '../utils/jwt'
import { errors } from '../utils/constants'
import { GraphQLError } from 'graphql'

export function isAuthorized(parent: any, args: any, context: any) {
    const authorizationHeader = args.req.headers.authorization

    if (!authorizationHeader?.length) {
        throw new GraphQLError(`${errors.JWT_INVALID.msg} ${errors.JWT_INVALID.code}`)
    }

    try {
        const token: string = authorizationHeader.split(' ')[1] as string

        const decodeValue: any = jwt.verify(token, accessJwtSecret)

        args.req.user = decodeValue.user

        return args
    } catch (e) {
        throw new GraphQLError(`${errors.JWT_INVALID.msg} ${errors.JWT_INVALID.code}`)
    }
}
