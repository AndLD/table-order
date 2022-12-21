import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ApolloClient } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'
import { ApolloProvider } from '@apollo/client/react'

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
