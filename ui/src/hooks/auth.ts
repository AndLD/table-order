import { useEffect, useReducer } from 'react'
import { useQuery } from '@apollo/client'
import { GET_IS_AUTHORIZED } from '../graphql/queries/auth'

export function useAuth() {
    const [token, setToken] = useReducer((state: string | null, newState: string | null) => {
        if (newState) {
            localStorage.setItem('token', newState)
        } else {
            localStorage.removeItem('token')
        }

        return newState
    }, localStorage.getItem('token') || null)

    const { data, loading } = useQuery(GET_IS_AUTHORIZED, { skip: !token })

    useEffect(() => {
        if (!loading && data?.isAuthorized === false) {
            setToken(null)
        }
    }, [data])

    return [token, setToken] as [string | null, React.Dispatch<React.SetStateAction<string | null>>]
}
