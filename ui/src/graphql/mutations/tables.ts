import { gql } from '@apollo/client'

export const CREATE_TABLE = gql`
    mutation createTable($input: TableInput) {
        createTable(input: $input) {
            id
            number
            seats
            width
            height
            shape
            x
            y
        }
    }
`

export const UPDATE_TABLE = gql`
    mutation updateTable($id: String, $input: TableInput) {
        updateTable(id: $id, input: $input) {
            id
            number
            seats
            width
            height
            shape
            x
            y
        }
    }
`
