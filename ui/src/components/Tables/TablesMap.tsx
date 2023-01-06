import { useContext, useEffect, useState } from 'react'
import { tablesContext } from '../../contexts'
import { useGetAllTables } from '../../hooks/graphql/queries/tables'
import '../../styles/Tables.scss'
import { ITable } from '../../utils/interfaces/table'

export default function TablesMap() {
    const {
        tablesState: [tables, setTables],
        selectedTableState: [selectedTable, setSelectedTable],
        tableInitialValuesState: [tableInitialValues, setTableInitialValues],
        createTableModalVisibilityState: [isCreateTableModalVisible, setIsCreateTableModalVisible]
    } = useContext(tablesContext)
    useGetAllTables(setTables)

    const [map, setMap] = useState<(ITable | null)[][]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const _tables = [...tables]

        const newMap: (ITable | null)[][] = []

        for (let x = 0; x <= 10; x++) {
            const str: (ITable | null)[] = []

            for (let y = 0; y <= 10; y++) {
                str.push(
                    _tables.find((table, i) => {
                        return table.x === x && table.y === y && _tables.splice(i, 1)
                    }) || null
                )
            }

            newMap.push(str)
        }

        setMap(newMap)
    }, [tables])

    return (
        <div className="tables-map" style={{ width: map.length * 60 - 10 }}>
            {map.map((str, x) => (
                <div className="str" key={crypto.randomUUID()}>
                    {str.map((table, y) => {
                        if (table) {
                            return (
                                <div
                                    className="point table"
                                    key={crypto.randomUUID()}
                                    style={{
                                        borderRadius: table.shape === 'oval' ? '50%' : 'none',
                                        borderColor:
                                            (x === selectedTable?.x && y === selectedTable?.y && 'green') || 'black'
                                    }}
                                    onClick={() => {
                                        if (table === selectedTable) {
                                            setSelectedTable(null)
                                        } else {
                                            setSelectedTable(table)
                                        }
                                    }}
                                >
                                    {y}/{x}
                                </div>
                            )
                        } else {
                            return (
                                <div
                                    className="point empty"
                                    key={crypto.randomUUID()}
                                    onClick={() => {
                                        setIsCreateTableModalVisible(true)
                                        setTableInitialValues({ x, y })
                                    }}
                                >
                                    {y}/{x}
                                </div>
                            )
                        }
                    })}
                </div>
            ))}
        </div>
    )
}
