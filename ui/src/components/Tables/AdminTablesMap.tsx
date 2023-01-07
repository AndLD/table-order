import { useContext, useEffect, useState } from 'react'
import { appContext, tablesContext } from '../../contexts'
import '../../styles/Tables.scss'
import { ITable } from '../../utils/interfaces/table'

export default function AdminTablesMap() {
    const {
        tablesState: [tables],
        selectedTableState: [selectedTable, setSelectedTable],
        tableInitialValuesState: [tableInitialValues, setTableInitialValues],
        createTableModalVisibilityState: [isCreateTableModalVisible, setIsCreateTableModalVisible],
        selectedTimestampState: [selectedTimestamp]
    } = useContext(tablesContext)

    const [orders] = useContext(appContext).ordersState

    const [map, setMap] = useState<(ITable | null)[][]>([])

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
        <div className="admin-tables-map" style={{ width: map.length * 60 - 10 }}>
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
                                            x === selectedTable?.x && y === selectedTable?.y
                                                ? 'green'
                                                : selectedTimestamp &&
                                                  // TODO: Refactor: Optimize algorithm
                                                  orders.find((order) => {
                                                      return (
                                                          order.tableId === table.id &&
                                                          Math.abs(selectedTimestamp - order.timestamp) < 60 * 60 * 1000
                                                      )
                                                  })
                                                ? 'red'
                                                : 'black'
                                    }}
                                    onClick={() => {
                                        if (table === selectedTable) {
                                            setSelectedTable(null)
                                        } else {
                                            setSelectedTable(table)
                                        }
                                    }}
                                >
                                    {x}/{y}
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
                                    {x}/{y}
                                </div>
                            )
                        }
                    })}
                </div>
            ))}
        </div>
    )
}
