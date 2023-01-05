import { gql } from '@apollo/client'

export const GET_ALL_TABLES = gql`
    query {
        getAllTables {
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
