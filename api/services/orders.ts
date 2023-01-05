import { GraphQLError } from 'graphql'
import { IOrder, IOrderPostBody } from '../utils/interfaces/order'
import { firebaseService } from './firebase'

async function getAllOrders() {
    const [modelResult, modelError] = await firebaseService.query({ collection: 'orders', action: 'get' })

    if (modelError) {
        throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
    }

    if (!modelResult?.length) {
        return []
    }

    return modelResult
}

async function getOrdersByTableId(tableId: string) {
    const [modelResult, modelError] = await firebaseService.query({
        collection: 'orders',
        action: 'get',
        where: [['tableId', '==', tableId]]
    })

    if (modelError) {
        throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
    }

    if (!modelResult?.length) {
        return []
    }

    return modelResult as IOrder[]
}

async function createOrder(order: IOrderPostBody) {
    const [modelResult, modelError] = await firebaseService.query({
        collection: 'orders',
        action: 'add',
        obj: order
    })

    if (modelError) {
        throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
    }

    return modelResult
}

async function deleteOrder(id: string) {
    const [_, modelError] = await firebaseService.query({
        collection: 'orders',
        action: 'delete',
        docId: id
    })

    if (modelError) {
        throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
    }
}

// Some comment
export const orderService = {
    getAllOrders,
    getOrdersByTableId,
    createOrder,
    deleteOrder
}
