import { GraphQLError } from 'graphql'
import { firebaseService } from '../services/firebase'

async function getAllOrders() {
    const [modelResult, modelError] = await firebaseService.query({ collection: 'tables', action: 'get' })

    if (modelError) {
        throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
    }

    if (!modelResult?.length) {
        return []
    }

    return modelResult
}

export const orderControllers = {
    getAllOrders
}
