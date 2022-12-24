import { gql } from '@apollo/client'

export const CREATE_TABLE = gql`
    mutation createTable($input: TableInput) {
        createTabel(input: $input) {
            id
            number
            seats
            width
            height
            x
            y
        }
    }
`

export const UPDATE_TABLE = gql`
    mutation updateTable($id: String, $input: TableInput) {
        updateTabel(id: $id, input: $input) {
            id
            number
            seats
            width
            height
            x
            y
        }
    }
`
