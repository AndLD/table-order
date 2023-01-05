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
