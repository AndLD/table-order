import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql'
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')

    console.log(token)

    return {
        ...headers,
        authorization: token ? `Bearer ${token}` : undefined
    }
})

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})
