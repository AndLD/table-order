import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import httpServer from 'http'
import cookieParser from 'cookie-parser'
import { graphqlHTTP } from 'express-graphql'
import { loggerMiddleware } from '../middlewares/logger'
import { schema } from './schema'
import { root } from './root'

export function setupServer() {
    const app = express()

    app.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false }))
    app.use(express.json())

    // const whitelist = process.env.WHITELIST_URLS
    // const corsOptions = {
    //     origin: function (origin: string, callback: any) {
    //         if (!origin || whitelist?.indexOf(origin) !== -1) {
    //             callback(null, true)
    //         } else {
    //             callback(new Error('Not allowed by CORS'))
    //         }
    //     },
    //     credentials: true
    // }
    app.use(cors())
    app.use(cookieParser())
    app.use(loggerMiddleware)

    app.use('/graphql', graphqlHTTP({ schema, rootValue: root, graphiql: true }))

    return httpServer.createServer(app)
}
