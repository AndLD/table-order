import { getLogger } from 'log4js'
import mongoose from 'mongoose'

const logger = getLogger('services/mongodb')

async function init() {
    await mongoose
        .connect('mongodb+srv://root:Fatal544@cluster1.zhful.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            logger.info('MongoDB successfully connected.')
        })
}

export const mongodbService = {
    init
}
