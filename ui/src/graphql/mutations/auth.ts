import { gql } from '@apollo/client'

export const LOGIN = gql`
    mutation login($input: LoginInput) {
        login(input: $input)
    }
`

export const LOGOUT = gql`
    mutation {
        logout: Boolean
    }
`
