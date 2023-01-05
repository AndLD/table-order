import { GraphQLError } from 'graphql'
import { isAuthorized } from '../middlewares/auth'
import { emailService } from '../services/email'
import { orderService } from '../services/orders'
import { tableService } from '../services/tables'
import { IOrderPostBody } from '../utils/interfaces/order'

async function getAllOrders(parent: any, args: any, context: any) {
    isAuthorized(parent, args, context)

    return await orderService.getAllOrders()
}

async function createOrder(parent: any, args: any, context: any) {
    const body: IOrderPostBody = args.req.body.variables.input

    const table = await tableService.getTableById(body.tableId)
    if (!table) {
        throw new GraphQLError(`Table does not exists 404`)
    }
    const orders = await orderService.getOrdersByTableId(body.tableId)

    for (const order of orders) {
        if (Math.abs(body.timestamp - order.timestamp) < 60 * 60 * 1000) {
            throw new GraphQLError(`Table already ordered for specified timestamp 400`)
        }
    }

    const order = await orderService.createOrder(body)

    await emailService.sendOrderConfirmation(body.email, order.id)

    return order
}

async function deleteOrder(parent: any, args: any, context: any) {
    isAuthorized(parent, args, context)

    const orderId: string = args.req.body.variables.id

    await orderService.deleteOrder(orderId)

    return true
}

export const orderControllers = {
    getAllOrders,
    createOrder,
    deleteOrder
}
