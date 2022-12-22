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
        username: String
        password: String
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
        getAllTables: [Table]
        getAllOrders: [Order]
        getIsAuthorized: Boolean
    }

    type Mutation {
        login: String
        createTable: [Table]
        createOrder: [Order]
    }
`)
