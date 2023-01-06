import { useEffect, useState } from 'react'
import { ITable, ITablePutBody } from '../utils/interfaces/table'

export function useTablesContextValue() {
    const [tableInitialValues, setTableInitialValues] = useState<ITablePutBody | undefined>()
    const [selectedTable, setSelectedTable] = useState<ITable | null>(null)

    useEffect(() => {
        setTableInitialValues(selectedTable || undefined)
    }, [selectedTable])

    return {
        tablesState: useState<ITable[]>([]),
        tableInitialValuesState: [tableInitialValues, setTableInitialValues] as [
            ITablePutBody | undefined,
            React.Dispatch<React.SetStateAction<ITablePutBody | undefined>>
        ],
        selectedTableState: [selectedTable, setSelectedTable] as [
            ITable | null,
            React.Dispatch<React.SetStateAction<ITable | null>>
        ],
        createTableModalVisibilityState: useState(false),
        updateTableModalVisibilityState: useState(false),
        selectedTimestampState: useState<number | null>(null)
    }
}
