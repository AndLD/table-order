import { useContext, useEffect, useReducer, useState } from 'react'
import { appContext } from '../contexts'
import { IOrder } from '../utils/interfaces/order'
import { useGetAllOrders } from './graphql/queries/orders'

export function useAppContextValue(tokenState: [string | null, React.Dispatch<React.SetStateAction<string | null>>]) {
    const isMenuCollapsedState = useReducer((state: boolean, newState: boolean) => {
        if (newState) {
            localStorage.setItem('isMenuCollapsed', 'true')
        } else {
            localStorage.removeItem('isMenuCollapsed')
        }

        return newState
    }, !!localStorage.getItem('isMenuCollapsed'))

    const titleState = useReducer((state: string | null, newTitle: string | null) => {
        document.title = newTitle || 'Table order'
        return newTitle
    }, 'Table order')

    const [orders, setOrders] = useState<IOrder[]>([])
    useGetAllOrders(setOrders)

    return {
        tokenState,
        isMenuCollapsedState,
        titleState,
        ordersState: [orders, setOrders] as [IOrder[], React.Dispatch<React.SetStateAction<IOrder[]>>]
    }
}

export function useToken() {
    const [token] = useContext(appContext).tokenState

    return token
}

export function useTitle(title: string) {
    const [_, setTitle] = useContext(appContext).titleState

    useEffect(() => {
        setTitle(title)
    }, [])
}
