import { Router } from 'express'
import { authPublicControllers } from '../../controllers/public/auth'

export default Router()
    .post('/login', authPublicControllers.postLogin)
    .get('/refresh', authPublicControllers.postRefresh)
    .post('/logout', authPublicControllers.postLogout)
