import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_TABLES } from '../graphql/query/table'
import { ITable } from '../interfaces/table'

export default function Tables() {
    const { data, loading, error, refetch } = useQuery(GET_ALL_TABLES)

    const [tables, setTables] = useState<ITable[]>([])

    useEffect(() => {
        if (!loading) {
            setTables(data.getAllTables)
        }
    }, [data])

    return <div>{tables && tables.map((table) => <div key={table.id}>{table.number}</div>)}</div>
}
