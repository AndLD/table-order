import httpServer from 'http'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })
import { getLogger } from '../utils/logger'
import { environment } from '../utils/constants'
import { setupServer } from './server'
import { firebaseService } from '../services/firebase'
import { mongodbService } from '../services/mongodb'
import { emailService } from '../services/email'

let server: httpServer.Server | null = null
const port = process.env.PORT || 8080

export async function startApp() {
    const logger = getLogger('setup/index')

    await Promise.all([firebaseService.init(), mongodbService.init(), emailService.init()])
    server = setupServer()

    server.listen(port, () => {
        logger.info(`Server has been started on ${port}, env=${environment}`)
    })
}

export async function stopApp() {
    if (server) {
        server.close()
    }
}
