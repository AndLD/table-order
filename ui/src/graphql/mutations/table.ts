import { gql } from '@apollo/client'

export const CREATE_TABLE = gql`
    mutation createTable($input: UserInput) {
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
