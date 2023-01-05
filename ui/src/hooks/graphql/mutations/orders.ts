import { useMutation } from '@apollo/client'
import { useContext } from 'react'
import { appContext } from '../../../contexts'
import { CREATE_ORDER, DELETE_ORDER } from '../../../graphql/mutations/orders'
import { IOrder, IOrderPostBody } from '../../../utils/interfaces/order'
import { errorNotification } from '../../../utils/notifications'

export function useCreateOrder() {
    const [token] = useContext(appContext).tokenState

    const [createOrderMutation] = useMutation(CREATE_ORDER, {
        ignoreResults: true,
        context: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    })

    return (order: IOrderPostBody, callback: (result: IOrder) => void) => {
        createOrderMutation({
            variables: {
                input: order
            }
        })
            .then(({ data }) => {
                if (data.createOrder) {
                    callback(data.createOrder)
                }
            })
            .catch((err) => {
                const errors = err.graphQLErrors

                errorNotification(errors.join('\n'), 'Помилка оформлення замовлення')
            })
    }
}

export function useDeleteOrder() {
    const [token] = useContext(appContext).tokenState

    const [deleteOrderMutation] = useMutation(DELETE_ORDER, {
        ignoreResults: true,
        context: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    })

    return (id: string, callback: (result: any) => void) => {
        deleteOrderMutation({
            variables: {
                id
            }
        })
            .then(({ data }) => {
                if (data.deleteOrder) {
                    callback(data.deleteOrder)
                }
            })
            .catch((err) => {
                const errors = err.graphQLErrors

                errorNotification(errors.join('\n'), 'Помилка видалення замовлення')
            })
    }
}
