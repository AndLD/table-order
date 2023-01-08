import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client'
import { API_URL } from '../utils/constants'

const httpLink = createHttpLink({
    uri: API_URL + '/graphql'
})

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token')

    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : undefined
        }
    })

    return forward(operation)
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export const apolloClient = client
