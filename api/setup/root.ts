import { authControllers } from '../controllers/auth'
import { orderControllers } from '../controllers/orders'
import { tableControllers } from '../controllers/tables'

export const root = {
    ...authControllers,
    ...tableControllers,
    ...orderControllers
}
