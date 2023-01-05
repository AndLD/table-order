export interface IOrder {
    id: string
    timestamp: number
    tableId: string
    name: string
    address: string
    email: string
}

export interface IOrderPostBody {
    timestamp: number
    tableId: string
    name: string
    address: string
    email: string
}
