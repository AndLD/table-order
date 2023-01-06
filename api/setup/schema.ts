import { buildSchema } from 'graphql'

export const schema = buildSchema(`
    type Table {
        id: ID
        number: Int
        seats: Int
        width: Int
        height: Int
        shape: String
        x: Int
        y: Int
    }

    type Order {
        id: ID
        timestamp: Float
        tableId: ID
        name: String
        address: String
        email: String
    }

    input LoginInput {
        username: String!
        password: String!
    }

    input CreateTableInput {
        id: ID
        number: Int
        seats: Int!
        width: Int!
        height: Int!
        shape: String!
        x: Int!
        y: Int!
    }

    input UpdateTableInput {
        id: ID
        number: Int
        seats: Int
        width: Int
        height: Int
        shape: String
        x: Int
        y: Int
    }

    input OrderInput {
        id: ID
        timestamp: Float!
        tableId: ID!
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
        
        createTable(input: CreateTableInput): Table
        updateTable(id: String, input: UpdateTableInput): Table
        deleteTable(id: String): Boolean
        
        createOrder(input: OrderInput): Order
        deleteOrder(id: String): Boolean
    }
`)
