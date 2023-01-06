import { Button } from 'antd'
import { useContext } from 'react'
import { tablesContext } from '../../contexts'

export default function UpdateTableBtn() {
    const {
        selectedTableState: [selectedTable, setSelectedTable],
        tableInitialValuesState: [tableInitialValues, setTableInitialValues],
        updateTableModalVisibilityState: [isUpdateTableModalVisible, setIsUpdateTableModalVisible]
    } = useContext(tablesContext)

    return (
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
    )
}
