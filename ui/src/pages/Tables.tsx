import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_TABLES } from '../graphql/queries/table'
import { ITable } from '../utils/interfaces/table'
import { useTitle } from '../hooks/app'
import { errorNotification } from '../utils/notifications'

export default function Tables() {
    useTitle('Столи')

    const { data, loading, error, refetch } = useQuery(GET_ALL_TABLES)

    const [tables, setTables] = useState<ITable[]>([])

    useEffect(() => {
        if (!loading && data?.getAllTables) {
            setTables(data.getAllTables)
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

    return (
        <div>
            {tables.map((table) => (
                <div key={table.id}>{table.number}</div>
            ))}
        </div>
    )
}
