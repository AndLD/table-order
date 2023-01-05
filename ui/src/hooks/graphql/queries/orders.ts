import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { GET_ALL_ORDERS } from '../../../graphql/queries/orders'
import { IOrder } from '../../../utils/interfaces/order'
import { errorNotification } from '../../../utils/notifications'

export function useGetAllOrders(callback: (result: IOrder[]) => void) {
    const { data, loading, error, refetch } = useQuery(GET_ALL_ORDERS)

    useEffect(() => {
        if (!loading && data?.getAllOrders) {
            callback(data.getAllOrders)
        }
    }, [data])

    useEffect(() => {
        if (!error) {
            return
        }

        const errors = error.graphQLErrors

        if (errors.length) {
            errorNotification(errors[0].toString(), 'Помилка отримання замовлень')
        }
    }, [error])
}
