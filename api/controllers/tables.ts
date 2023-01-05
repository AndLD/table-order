import { GraphQLError } from 'graphql'
import { isAuthorized } from '../middlewares/auth'
import { firebaseService } from '../services/firebase'
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

    const table = {
        number: getRandomNumber(0, 9999),
        ...body
    }

    const [modelResult, modelError] = await firebaseService.query({
        collection: 'tables',
        action: 'add',
        obj: table
    })

    if (modelError) {
        throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
    }

    return modelResult
}

async function updateTable(parent: any, args: any, context: any) {
    isAuthorized(parent, args, context)

    const tableId: string = args.req.body.variables.id
    const body: ITablePutBody = args.req.body.variables.input

    return tableService.updateTable(tableId, body)
}

async function deleteTable(parent: any, args: any, context: any) {
    isAuthorized(parent, args, context)

    const tableId: string = args.req.body.variables.id

    await tableService.deleteTable(tableId)

    return true
}

export const tableControllers = {
    getAllTables,
    createTable,
    updateTable,
    deleteTable
}
