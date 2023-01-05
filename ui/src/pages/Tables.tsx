import { useState } from 'react'
import { useTitle } from '../hooks/app'
import { useGetAllTables } from '../hooks/graphql/queries/tables'
import { ITable } from '../utils/interfaces/table'

export default function Tables() {
    useTitle('Столи')

    const [tables, setTables] = useState<ITable[]>([])

    useGetAllTables(setTables)

    return (
        <div>
            {tables.map((table) => (
                <div key={table.id}>{table.number}</div>
            ))}
        </div>
    )
}
