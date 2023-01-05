import { gql } from '@apollo/client'

export const CREATE_ORDER = gql`
    mutation createOrder($input: OrderInput) {
        createOrder(input: $input) {
            id
            timestamp
            tableId
            name
            email
            address
        }
    }
`

export const DELETE_ORDER = gql`
    mutation deleteOrder($id: String) {
        deleteOrder(id: $id)
    }
`
