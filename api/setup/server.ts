import express from 'express'
import cors, { CorsOptions } from 'cors'
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

    const whitelist = process.env.WHITELIST_URLS
    const corsOptions: CorsOptions = {
        origin: function (origin: string, callback: any) {
            if (!origin || whitelist?.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        } as any,
        credentials: true
    }
    app.use(cors(corsOptions))
    app.use(cookieParser())
    app.use(loggerMiddleware)

    app.use(
        '/graphql',
        graphqlHTTP((req, res, graphqlParams) => ({
            schema,
            rootValue: root,
            graphiql: true,
            context: {
                req,
                res
            },
            customFormatErrorFn: (err) => err.message as any
        }))
    )

    return httpServer.createServer(app)
}
