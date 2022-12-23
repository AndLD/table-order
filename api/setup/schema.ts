import { buildSchema } from 'graphql'

export const schema = buildSchema(`
    type Table {
        id: ID
        number: Int
        seats: Int
        shape: String
        width: Int
        height: Int
        x: Int
        y: Int
    }

    type Order {
        id: ID
        timestamp: Int
        name: String
        address: String
        email: String
    }

    input LoginInput {
        username: String!
        password: String!
    }

    input TableInput {
        id: ID
        number: Int
        seats: Int!
        shape: String!
        width: Int!
        height: Int!
        x: Int!
        y: Int!
    }

    input OrderInput {
        id: ID
        timestamp: Int
        tableId: ID
        name: String!
        address: String!
        email: String!
    }

    type Query {
        getIsAuthorized: Boolean
        getAllTables: [Table]
        getAllOrders: [Order]
    }

    type Mutation {
        login(input: LoginInput): String
        logout: Boolean
        refresh: String
        createTable(input: TableInput): Table
        createOrder(input: OrderInput): Order
    }
`)
