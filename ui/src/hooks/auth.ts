import { useEffect, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { appContext } from '../contexts'
import { GET_IS_AUTHORIZED } from '../graphql/query/auth'

export function useAuth() {
    const [token, setToken] = useContext(appContext).tokenState

    const { data, loading, error, refetch } = useQuery(GET_IS_AUTHORIZED)

    useEffect(() => {
        if (!loading && data.getIsAuthorized === false) {
            setToken(null)
        }
    }, [data])
}
