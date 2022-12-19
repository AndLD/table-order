import httpServer from 'http'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })
import { getLogger } from '../utils/logger'
import { setupServer } from '../setup/server'
import { firebaseQuery } from '../services/firebase'
import { environment } from '../utils/constants'

let server: httpServer.Server | null = null
const port = process.env.PORT || 8080

export async function startApp() {
    const logger = getLogger('setup/index')

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
