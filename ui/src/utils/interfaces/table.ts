export interface ITable {
    id: string
    number: number
    seats: number
    width: number
    height: number
    shape: TableShape
    x: number
    y: number
}

export type TableShape = 'rectangular' | 'oval'

export interface ITablePostBody {
    seats: number
    width: number
    height: number
    shape: TableShape
    x: number
    y: number
}

export interface ITablePutBody {
    seats?: number
    width?: number
    height?: number
    shape?: TableShape
    x?: number
    y?: number
}
