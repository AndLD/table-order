import { gql } from '@apollo/client'

export const CREATE_TABLE = gql`
    mutation createTable($input: CreateTableInput) {
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
    mutation updateTable($id: String, $input: UpdateTableInput) {
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

export const DELETE_TABLE = gql`
    mutation deleteTable($id: String) {
        deleteTable(id: $id)
    }
`
