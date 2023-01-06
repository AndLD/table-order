import { ToolOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useContext } from 'react'
import { tablesContext } from '../../contexts'
import { useUpdateTable } from '../../hooks/graphql/mutations/tables'
import { ITablePutBody } from '../../utils/interfaces/table'
import { errorNotification } from '../../utils/notifications'
import TableForm from './TableForm'

export function UpdateTableModal() {
    const [form] = useForm()

    const {
        updateTableModalVisibilityState: [isVisible, setIsVisible],
        tableInitialValuesState: [initialValues],
        tablesState: [tables, setTables],
        selectedTableState: [selectedTable, setSelectedTable]
    } = useContext(tablesContext)

    const updateTable = useUpdateTable()

    function onOk() {
        if (!selectedTable) {
            return errorNotification('Жодного стола не виділено')
        }
        if (!initialValues) {
            return errorNotification('Початкове значення полів відсутнє')
        }

        form.validateFields()
            .then((body: ITablePutBody) => {
                const putBody = getChanges<ITablePutBody>(initialValues, body)
                if (!Object.keys(putBody).length) {
                    return errorNotification('Не оновлено жодного поля')
                }

                updateTable(selectedTable.id, putBody, (updatedTable) => {
                    setTables(
                        tables.map((table) => {
                            if (table.id === selectedTable.id) {
                                return updatedTable
                            }

                            return table
                        })
                    )
                    setSelectedTable(null)
                    close()
                })
            })
            .catch(() => errorNotification('Validation Error'))
    }

    function close() {
        setIsVisible(false)
    }

    return (
        <Modal
            visible={isVisible}
            title={
                <>
                    <ToolOutlined style={{ fontSize: 22 }} /> Редагувати Стіл
                </>
            }
            onOk={onOk}
            onCancel={close}
        >
            <TableForm form={form} />
        </Modal>
    )
}

export function getChanges<T>(initialValues: T, values: T) {
    const updatedValues = {} as T

    for (const key in values) {
        if (values[key] !== initialValues[key]) {
            updatedValues[key] = values[key]
        }
    }

    return updatedValues
}
