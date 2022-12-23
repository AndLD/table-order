import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_TABLES } from '../graphql/queries/table'
import { ITable } from '../utils/interfaces/table'
import { useTitle } from '../hooks/app'

export default function Tables() {
    useTitle('Столи')

    // const { data, loading, error, refetch } = useQuery(GET_ALL_TABLES)

    const [tables, setTables] = useState<ITable[]>([])

    // useEffect(() => {
    //     if (!loading) {
    //         setTables(data.getAllTables)
    //     }
    // }, [data])

    return <div>{tables && tables.map((table) => <div key={table.id}>{table.number}</div>)}</div>
}
