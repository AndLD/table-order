import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { GET_ALL_TABLES } from '../../../graphql/queries/tables'
import { ITable } from '../../../utils/interfaces/table'
import { errorNotification } from '../../../utils/notifications'

export function useGetAllTables(callback: (result: ITable[]) => void) {
    const { data, loading, error, refetch } = useQuery(GET_ALL_TABLES)

    useEffect(() => {
        if (!loading && data?.getAllTables) {
            callback(data.getAllTables)
        }
    }, [data])

    useEffect(() => {
        if (!error) {
            return
        }

        const errors = error.graphQLErrors

        if (errors.length) {
            errorNotification(errors[0].toString(), 'Помилка отримання столів')
        }
    }, [error])
}
