import { Button, Popconfirm } from 'antd'
import { useContext } from 'react'
import { tablesContext } from '../../contexts'
import { useDeleteTable } from '../../hooks/graphql/mutations/tables'

export default function DeleteTableBtn() {
    const {
        tablesState: [tables, setTables],
        selectedTableState: [selectedTable, setSelectedTable]
    } = useContext(tablesContext)

    const deleteTable = useDeleteTable()

    return (
        <Popconfirm
            disabled={!selectedTable}
            title="Are you sure to delete?"
            onConfirm={() => {
                if (selectedTable) {
                    deleteTable(selectedTable.id, (result) => {
                        if (result) {
                            setTables(tables.filter((table) => table.id !== selectedTable.id))
                            setSelectedTable(null)
                        }
                    })
                }
            }}
            okText="Yes"
            cancelText="No"
        >
            <Button style={{ margin: '0 0 0 5px' }} type="primary" disabled={!selectedTable}>
                Delete
            </Button>
        </Popconfirm>
    )
}
