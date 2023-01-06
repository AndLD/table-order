import { Button, DatePicker, Popconfirm } from 'antd'
import moment from 'moment'
import { useContext } from 'react'
import { tablesContext } from '../../contexts'
import { useDeleteTable } from '../../hooks/graphql/mutations/tables'

export default function TableControls() {
    const {
        tablesState: [tables, setTables],
        selectedTableState: [selectedTable, setSelectedTable],
        tableInitialValuesState: [tableInitialValues, setTableInitialValues],
        updateTableModalVisibilityState: [isUpdateTableModalVisible, setIsUpdateTableModalVisible]
    } = useContext(tablesContext)

    const deleteTable = useDeleteTable()

    const onOk = (value: any) => {
        console.log('onOk: ', moment().format())
        console.log('onOk: ', typeof value)
        console.log('onOk: ', value.format('YYYY-MM-DD HH:mm:ss'))
    }

    return (
        <div style={{ textAlign: 'right', margin: '0 0 16px 0' }}>
            <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={(current) => {
                    let customDate = moment().format('YYYY-MM-DD')
                    return current && current < moment(customDate, 'YYYY-MM-DD')
                }}
                disabledTime={(current) => current?.isBefore(moment()) as any}
                showTime
                onOk={onOk}
            />
            <Button
                style={{ margin: '0 0 0 5px' }}
                type="primary"
                disabled={!selectedTable}
                onClick={() => {
                    if (selectedTable) {
                        setIsUpdateTableModalVisible(true)
                        setTableInitialValues(selectedTable)
                    }
                }}
            >
                Update
            </Button>
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
        </div>
    )
}
