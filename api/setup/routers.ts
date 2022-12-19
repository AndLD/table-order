import { Express } from 'express'
import { isAuthorized } from '../middlewares/auth'
import { setReqEntity } from '../middlewares/decorators'
import ordersPublicRouter from '../routers/public/orders'
import ordersPrivateRouter from '../routers/private/orders'
import tablesPrivateRouter from '../routers/private/tables'
import authPublicRouter from '../routers/public/auth'
import { entities } from '../utils/constants'
import { Router } from 'express'

export function setupRouters(app: Express) {
    const apiRouter = Router()
    app.use('/api', apiRouter)

    // Unauthorized router
    const publicRouter = Router()
    apiRouter.use('/public', publicRouter)

    publicRouter.use('/orders', setReqEntity(entities.ORDERS), ordersPublicRouter)
    publicRouter.use('/auth', authPublicRouter)

    // Authorized router
    const privateRouter = Router()
    apiRouter.use('/private', isAuthorized, privateRouter)

    privateRouter.use('/tables', setReqEntity(entities.TABLES), tablesPrivateRouter)
    privateRouter.use('/orders', setReqEntity(entities.ORDERS), ordersPublicRouter)
}
