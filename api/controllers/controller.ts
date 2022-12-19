import { Request, Response } from 'express'
import { firebaseQuery } from '../services/firebase'
import { apiUtils } from '../utils/api'
import { errors } from '../utils/constants'
import { tryCatch } from '../utils/decorators'
import {
    Any,
    Controller,
    HttpMethod,
    LogicOperator,
    Filter,
    ModelResult,
    Error,
    Pagination,
    ArrayContainsFilter,
    Collection,
    IParsedReqData
} from '../utils/types'

export const controller = tryCatch(async function (req: Request, res: Response) {
    // Parse data from request
    const [reqData, parseReqError] = parseReq(req)
    if (parseReqError) {
        return apiUtils.sendError(res, parseReqError)
    }

    if (!reqData) {
        return apiUtils.sendError(res, errors.INTERNAL_SERVER_ERROR)
    }

    const { method, id, singleResult, ids, pagination, select, order, obj, entity, email, where }: IParsedReqData =
        reqData

    if (method === 'GET' && !id && singleResult) {
        return apiUtils.sendResult(res, null)
    }

    if (method === 'PUT' && !id) {
        return apiUtils.sendError(res, errors.BAD_REQUEST)
    }

    let [modelResult, modelError] = (await controllerMethods[method]({
        id,
        ids,
        pagination,
        select,
        order,
        obj,
        entity,
        email,
        where
    })) as [ModelResult | null, Error | null]
    if (modelError) {
        return apiUtils.sendError(res, modelError)
    }

    let meta
    if (modelResult?._meta) {
        meta = modelResult._meta
        delete modelResult._meta
    }

    return res.json({
        result: modelResult?.mainResult,
        meta
    })
} as Controller)

export const controllerMethods = {
    GET: async ({
        email,
        id,
        ids,
        pagination,
        select,
        order,
        entity,
        where
    }: {
        email: string
        id?: string
        ids?: string[]
        pagination?: Pagination
        select?: string[]
        order?: [string, string]
        entity: Collection
        where?: Filter[]
    }) =>
        await firebaseQuery({
            email,
            collection: entity,
            where,
            docId: id,
            docIds: ids,
            pagination,
            select,
            order,
            action: 'get'
        }),

    POST: async ({ id, obj, entity }: { id?: string; obj: Any; entity: Collection }) =>
        await firebaseQuery({
            collection: entity,
            docId: id,
            action: 'add',
            obj
        }),

    PUT: async ({
        email,
        id,
        obj,
        entity,
        findByUserEmail
    }: {
        email: string
        id?: string
        obj: Any
        entity: Collection
        findByUserEmail?: boolean
    }) =>
        await firebaseQuery({
            email,
            collection: entity,
            docId: findByUserEmail ? obj[0].id : id,
            action: 'update',
            obj
        }),

    DELETE: async ({ email, id, ids, entity }: { email: string; id?: string; ids?: string[]; entity: Collection }) => {
        const [result, error] = await firebaseQuery({
            email,
            collection: entity,
            docId: id,
            docIds: ids,
            action: 'delete'
        })
        return error ? [null, error] : [result, null]
    }
}

function parseReq(req: any): [IParsedReqData | null, Error | null] {
    const method: HttpMethod = req.method
    const id: string | undefined = req.params.id
    const singleResult: boolean = req.singleResult

    let ids: string[] | undefined
    if (method === 'DELETE' || method === 'GET') {
        ids = req.query.ids?.split(',')
    }

    let pagination
    if (method === 'GET' && !id && !ids) {
        const results = parseInt(req.query.results) || 10
        const page = parseInt(req.query.page)
        if (page)
            pagination = {
                results,
                page
            }
    }

    // Fields to retrieve from DB
    let select
    if (method === 'GET' && req.query.select) {
        select = req.query.select.split(',')
    }
    // Sorting order
    let order
    if (method === 'GET' && req.query.order) {
        order = req.query.order.split(',')
    }

    const obj: Any = req.body

    // Entity is DB collection name
    const entity: Collection = req.entity
    // Authorized user email
    const email: string = req.user?.email
    // Получение фильтров. where - блок условий для поиска по базе
    const where = parseFilters({ queryParams: req.query })

    return [
        {
            method,
            id,
            singleResult,
            ids,
            pagination,
            select,
            order,
            obj,
            entity,
            email,
            where
        },
        null
    ]
}

// Parses filters from query params of request
function parseFilters({ queryParams }: { queryParams: { filters: string | undefined } }): Filter[] {
    if (!queryParams.filters) return []

    try {
        const filters: Filter[] | ArrayContainsFilter[] = decodeURI(queryParams.filters)
            .split(':')
            .map((filter: string) => {
                const [key, operator, value] = filter.split(',') as [string, LogicOperator | 'contains' | 'in', string]

                let convertedValue: number | boolean | string = value

                if (!['contains', 'in'].includes(operator)) {
                    const floatValue = parseFloat(value as string)

                    if (floatValue) {
                        convertedValue = floatValue
                    } else if (value === 'true') convertedValue = true
                    else if (value === 'false') convertedValue = false
                }

                if (operator === 'contains') {
                    return [key, 'array-contains', convertedValue as string]
                } else if (operator === 'in') {
                    return [key, 'in', (convertedValue as string).split('.')]
                } else return [key, operator, convertedValue]
            })

        return filters
    } catch (e) {
        throw errors.BAD_FILTERS
    }
}
