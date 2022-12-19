import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { tryCatch } from '../../utils/decorators'
import { IAuthPostBody } from '../../utils/interfaces/auth'
import { errors, rootUser } from '../../utils/constants'
import { IUserState } from '../../utils/interfaces/user'
import { createJwt, refreshJwtSecret } from '../../utils/jwt'
import { apiUtils } from '../../utils/api'

interface IRefreshJwtPayload extends jwt.JwtPayload {
    user: IUserState
}

async function postLogin(req: any, res: Response) {
    const body: IAuthPostBody = req.body

    const isValid = body.username === 'root' && body.password === rootUser.password

    if (!isValid) {
        return apiUtils.sendError(res, errors.CREDENTIALS_INVALID)
    }

    // JWT
    const userState: IUserState = {
        username: req.user.username
    }

    const tokens = createJwt(userState)

    res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })
    res.json({
        result: tokens.accessToken
    })
}

async function postRefresh(req: any, res: Response) {
    const refreshToken = req.cookies.refresh_token

    if (!refreshToken) {
        return apiUtils.sendError(res, errors.UNABLE_TO_REFRESH_ACCESS_JWT)
    }

    // TODO: Investigate cases when jwt.verify can return a string ?
    try {
        var decodeValue: IRefreshJwtPayload = jwt.verify(refreshToken, refreshJwtSecret) as IRefreshJwtPayload
    } catch (e) {
        return apiUtils.sendError(res, errors.UNABLE_TO_REFRESH_ACCESS_JWT)
    }
    if (!decodeValue?.user) {
        throw new Error('decodeValue.user is empty!')
    }

    const userState: IUserState = {
        username: 'root'
    }

    const tokens = createJwt(userState)

    res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })
    apiUtils.sendResult(res, tokens.accessToken)
}

async function postLogout(_: any, res: Response) {
    res.clearCookie('refresh_token')
    res.sendStatus(200)
}

export const authPublicControllers = {
    postLogin: tryCatch(postLogin),
    postRefresh: tryCatch(postRefresh),
    postLogout: tryCatch(postLogout)
}
