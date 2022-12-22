import { gql } from '@apollo/client'

export const LOGIN = gql`
    mutation login($input: LoginInput) {
        login(input: $input) {
            username
            password
        }
    }
`

export const LOGOUT = gql`
    mutation {
        logout: Boolean
    }
`
