// TODO: Refactor

import { NextFunction, Request, Response } from 'express'

export type Any = { [key: string]: any }

export type Error = {
    msg: string
    code: number
}
export type DefaultResult = [Any | null, Error | null]
export type ArrayResult = [Any | [] | null, Error | null]

export type Controller = (req: Request, res: Response, next?: NextFunction) => any

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type LogicOperator = '<' | '<=' | '==' | '>=' | '>'
export type UpdateOperator = '+' | '-'
// TODO: Remove 'in', 'array-contains' from 'Filter' type ?
export type Filter =
    | [string, LogicOperator, number | boolean | string]
    | [string, 'array-contains', string]
    | [string, 'array-contains-any', string[]]
    | [string, 'in', string[]]
    | [string, '!=', string]

export type ArrayContainsFilter = [string, 'array-contains', string]

export type ModelAction = 'get' | 'add' | 'update' | 'delete'
export type ModelArgs = {
    email?: string
    collection: Collection
    where?: Filter[]
    // TODO: Remove
    whereOperator?: WhereOperator
    docId?: string
    docIds?: string[]
    pagination?: Pagination
    select?: string[]
    order?: [string, string]
    action: ModelAction
    obj?: Any
}
export type Entity = Any
export type EntityName = 'orders' | 'tables'
export type ModelResult = {
    mainResult: { [key: string]: any } | null
    _meta?: {
        pagination?: { [key in keyof Pagination | 'total']: any }
    }
}

export type State = {
    state: any
    subscribers: Subscriber[]
}
export type SetStateFunction<Type> = (newState: Type) => void
export type Subscriber = (newState?: any) => void

export type Pagination = {
    results: number
    page: number
}

export interface IConnectionOptions {
    host: string | undefined
    port: number | undefined
    user: string | undefined
    password: string | undefined
    database: string | undefined
    connectionLimit?: number
}

export type WhereOperator = 'OR' | 'AND'

export type Collection = 'tables' | 'orders'

export type ModelQueryArrayAction = 'add' | 'delete'
export type ModelQueryArrayArgs = {
    collection: Collection
    docId?: string
    where?: Filter[]
    action: ModelQueryArrayAction
    key: string
    value: string
}

export interface IParsedReqData {
    method: HttpMethod
    id?: string
    singleResult: boolean
    ids?: string[]
    pagination?: Pagination
    select?: string[]
    order?: [string, string]
    obj: Any
    entity: Collection
    email: string
    where: Filter[] | undefined
}

export type ServiceAccount = {
    clientEmail: string
    privateKey: string
    projectId: string
}
