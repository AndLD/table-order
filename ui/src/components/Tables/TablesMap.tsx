import { useContext } from 'react'
import { tablesContext } from '../../contexts'
import { useGetAllTables } from '../../hooks/graphql/queries/tables'

export default function TablesMap() {
    const [tables, setTables] = useContext(tablesContext).tablesState
    useGetAllTables(setTables)

    return (
        <div>
            {tables.map((table) => (
                <div key={table.id}>{table.number}</div>
            ))}
        </div>
    )
}
