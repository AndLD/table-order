import mongoose from 'mongoose'
import { getLogger } from '../utils/logger'

const logger = getLogger('services/mongodb')
const MONGO_DB_CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING

async function init() {
    if (MONGO_DB_CONNECTION_STRING) {
        mongoose
            .connect(MONGO_DB_CONNECTION_STRING)
            .then(() => {
                logger.info('MongoDB successfully connected.')
            })
            .catch((err) => {
                logger.error(err)
            })
    } else {
        logger.error('Connecting error: MONGO_DB_CONNECTION_STRING missed')
    }
}

export const mongodbService = {
    init
}
