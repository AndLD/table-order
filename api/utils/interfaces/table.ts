export interface ITable {
    id: string
    number: number
    seats: number
    width: number
    height: number
    x: number
    y: number
}

export interface ITablePostBody {
    seats: number
    width: number
    height: number
    x: number
    y: number
}

export interface ITablePutBody {
    seats: number
    width: number
    height: number
    x: number
    y: number
}
