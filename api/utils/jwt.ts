import jwt from 'jsonwebtoken'
import { IUserState } from './interfaces/user'

export const accessJwtSecret: string = process.env.JWT_ACCESS_SECRET || 'super_secret1'
const accessJwtExpiresIn: string = process.env.JWT_ACCESS_EXPIRES_IN || '24h'

export function createJwt(userState: IUserState) {
    return jwt.sign({ user: userState }, accessJwtSecret, {
        expiresIn: accessJwtExpiresIn
    })
}
