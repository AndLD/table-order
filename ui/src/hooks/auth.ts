import { useEffect, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { appContext } from '../contexts'
import { GET_IS_AUTHORIZED } from '../graphql/queries/auth'

export function useAuth() {
    const [token, setToken] = useContext(appContext).tokenState

    const { data, loading } = useQuery(GET_IS_AUTHORIZED, { skip: !token })

    useEffect(() => {
        if (!loading && data?.getIsAuthorized === false) {
            setToken(null)
        }
    }, [data])
}
