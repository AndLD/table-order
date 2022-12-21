import { GraphQLArgs } from 'graphql'
import { isAuthorized } from '../middlewares/auth'

export const root = {
    getAllTables() {
        return [
            {
                id: 'dsfgfhd',
                number: 1,
                seats: 3,
                shape: 'rectangular',
                height: 100,
                width: 200,
                x: 0,
                y: 0
            }
        ]
    },
    getAllOrders() {},
    async getIsAuthorized(parent: any, args: GraphQLArgs, context: any) {
        return !!(await isAuthorized(parent, args, context))
    }
}
