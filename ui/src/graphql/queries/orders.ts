import { gql } from '@apollo/client'

export const GET_ALL_ORDERS = gql`
    query {
        getAllOrders {
            id
            timestamp
            tableId
            name
            email
            address
        }
    }
`
