import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { ApolloProvider } from '@apollo/client/react'
import { apolloClient } from './graphql'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <ApolloProvider client={apolloClient}>
        <App />
    </ApolloProvider>
)
