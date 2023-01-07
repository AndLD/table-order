import React, { useEffect, useState } from 'react'
import { ITable, ITablePutBody } from '../utils/interfaces/table'
import { useGetAllTables } from './graphql/queries/tables'

export function useTablesContextValue() {
    const [tables, setTables] = useState<ITable[]>([])
    const [tableInitialValues, setTableInitialValues] = useState<ITablePutBody | undefined>()
    const [selectedTable, setSelectedTable] = useState<ITable | null>(null)

    useGetAllTables(setTables)

    useEffect(() => {
        setTableInitialValues(selectedTable || undefined)
    }, [selectedTable])

    return {
        tablesState: [tables, setTables] as [ITable[], React.Dispatch<React.SetStateAction<ITable[]>>],
        tableInitialValuesState: [tableInitialValues, setTableInitialValues] as [
            ITablePutBody | undefined,
            React.Dispatch<React.SetStateAction<ITablePutBody | undefined>>
        ],
        selectedTableState: [selectedTable, setSelectedTable] as [
            ITable | null,
            React.Dispatch<React.SetStateAction<ITable | null>>
        ],
        selectedTimestampState: useState<number | null>(null),
        createTableModalVisibilityState: useState(false),
        updateTableModalVisibilityState: useState(false)
    }
}
