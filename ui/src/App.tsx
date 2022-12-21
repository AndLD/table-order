import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_TABLES } from './query/table'
import { ITable } from './interfaces/table'

function App() {
    const { data, loading, error } = useQuery(GET_ALL_TABLES)

    const [tables, setTables] = useState<ITable[]>([])

    useEffect(() => {
        if (!loading) {
            setTables(data.getAllTables)
        }
    }, [data])

    return (
        <div className="App">
            <form>
                <input type="text" />
            </form>
            {tables && tables.map((table) => <div key={table.id}>{table.number}</div>)}
        </div>
    )
}

export default App
