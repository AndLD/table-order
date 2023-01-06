import { isAuthorized } from '../middlewares/auth'
import { orderService } from '../services/orders'
import { tableService } from '../services/tables'
import { getRandomNumber } from '../utils/common'
import { ITablePostBody, ITablePutBody } from '../utils/interfaces/table'

async function getAllTables(parent: any, args: any, context: any) {
    isAuthorized(parent, args, context)

    return await tableService.getAllTables()
}

async function createTable(parent: any, args: any, context: any) {
    isAuthorized(parent, args, context)

    const body: ITablePostBody = args.req.body.variables.input

    await tableService.isCoordinatesUniq(body.x, body.y)

    const table = {
        number: getRandomNumber(0, 9999),
        ...body
    }

    return await tableService.createTable(table)
}

async function updateTable(parent: any, args: any, context: any) {
    isAuthorized(parent, args, context)

    const tableId: string = args.req.body.variables.id
    const body: ITablePutBody = args.req.body.variables.input

    if (body.x || body.y) {
        let newX = body.x
        let newY = body.y

        if (!body.x || !body.y) {
            const table = await tableService.getTableById(tableId)

            newX = body.x || table.x
            newY = body.y || table.y
        }

        await tableService.isCoordinatesUniq(newX as number, newY as number)
    }

    return await tableService.updateTable(tableId, body)
}

async function deleteTable(parent: any, args: any, context: any) {
    isAuthorized(parent, args, context)

    const tableId: string = args.req.body.variables.id

    const orders = await orderService.getOrdersByTableId(tableId)

    // Delete all orders bound with the table we gonna delete
    if (orders.length) {
        await orderService.deleteOrders(orders.map((order) => order.id))
    }

    await tableService.deleteTable(tableId)

    return true
}

export const tableControllers = {
    getAllTables,
    createTable,
    updateTable,
    deleteTable
}
