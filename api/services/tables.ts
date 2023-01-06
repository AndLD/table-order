import { GraphQLError } from 'graphql'
import { ITable, ITablePostBody, ITablePutBody } from '../utils/interfaces/table'
import { firebaseService } from './firebase'

async function getAllTables() {
    const [modelResult, modelError] = await firebaseService.query({ collection: 'tables', action: 'get' })

    if (modelError) {
        throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
    }

    if (!modelResult?.length) {
        return []
    }

    return modelResult
}

async function getTableById(id: string) {
    const [modelResult, modelError] = await firebaseService.query({ collection: 'tables', action: 'get', docId: id })

    if (modelError) {
        throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
    }

    return modelResult as ITable
}

async function createTable(table: ITablePostBody) {
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

async function updateTable(id: string, table: ITablePutBody) {
    const [modelResult, modelError] = await firebaseService.query({
        collection: 'tables',
        action: 'update',
        docId: id,
        obj: table
    })

    if (modelError) {
        throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
    }

    return modelResult
}

async function deleteTable(id: string) {
    const [_, modelError] = await firebaseService.query({
        collection: 'tables',
        action: 'delete',
        docId: id
    })

    if (modelError) {
        throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
    }
}

async function isCoordinatesUniq(x: number, y: number) {
    const [modelResult, modelError] = await firebaseService.query({
        collection: 'tables',
        action: 'get',
        where: [
            ['x', '==', x],
            ['y', '==', y]
        ]
    })

    if (modelError) {
        throw new GraphQLError(`${modelError.msg} ${modelError.code}`)
    }

    if (!!modelResult) {
        throw new GraphQLError(`Specified coordinates already in use 400`)
    }
}

export const tableService = {
    getAllTables,
    getTableById,
    createTable,
    updateTable,
    deleteTable,
    isCoordinatesUniq
}
