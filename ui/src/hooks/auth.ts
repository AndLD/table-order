import { useEffect, useReducer } from 'react'
import { useQuery } from '@apollo/client'
import { GET_IS_AUTHORIZED } from '../graphql/queries/auth'
import { errorNotification } from '../utils/notifications'

export function useAuth() {
    const [token, setToken] = useReducer((state: string | null, newState: string | null) => {
        if (newState) {
            localStorage.setItem('token', newState)
        } else {
            localStorage.removeItem('token')
        }

        return newState
    }, localStorage.getItem('token') || null)

    const { data, loading, error } = useQuery(GET_IS_AUTHORIZED, { skip: !token })

    useEffect(() => {
        if (!error) {
            return
        }

        const errors = error.graphQLErrors

        if (errors.length) {
            setToken(null)
            errorNotification(errors[0].toString(), 'Не авторизовано')
        }
    }, [error])

    return [token, setToken] as [string | null, React.Dispatch<React.SetStateAction<string | null>>]
}
