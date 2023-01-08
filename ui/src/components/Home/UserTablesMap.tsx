import { useContext, useEffect, useState } from 'react'
import { appContext, tablesContext } from '../../contexts'
import '../../styles/Home.scss'
import { ITable } from '../../utils/interfaces/table'

export default function UserTablesMap() {
    const {
        tablesState: [tables, setTables],
        selectedTableState: [selectedTable, setSelectedTable],
        selectedTimestampState: [selectedTimestamp, setSelectedTimestamp]
    } = useContext(tablesContext)

    const [orders, setOrders] = useContext(appContext).ordersState

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
        <span className="user-tables-map">
            {map.map((str, x) => (
                <div className="str" key={`x${x}`}>
                    {str.map((table, y) => {
                        if (table) {
                            const isTableOccupied =
                                selectedTimestamp &&
                                // TODO: Refactor: Optimize algorithm
                                orders.find((order) => {
                                    return (
                                        order.tableId === table.id &&
                                        Math.abs(selectedTimestamp - order.timestamp) < 60 * 60 * 1000
                                    )
                                })

                            const isTableAvailable = selectedTimestamp && !isTableOccupied

                            return (
                                <div className="table-wrapper">
                                    <div
                                        className="point table"
                                        key={`y${y}`}
                                        style={{
                                            borderRadius: table.shape === 'oval' ? '50%' : 'none',
                                            borderColor:
                                                x === selectedTable?.x && y === selectedTable?.y ? 'green' : 'black',
                                            opacity: isTableAvailable ? 1 : 0.3,
                                            cursor: isTableAvailable ? 'pointer' : 'default'
                                        }}
                                        onClick={
                                            isTableAvailable
                                                ? () => {
                                                      if (table === selectedTable) {
                                                          setSelectedTable(null)
                                                      } else {
                                                          setSelectedTable(table)
                                                      }
                                                  }
                                                : undefined
                                        }
                                    >
                                        {isTableAvailable && table.number}
                                    </div>
                                </div>
                            )
                        } else {
                            return <div className="point empty" key={`empty-y${y}`}></div>
                        }
                    })}
                </div>
            ))}
        </span>
    )
}
