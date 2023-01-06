import { ToolOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useContext, useState } from 'react'
import { tablesContext } from '../../contexts'
import { useCreateTable } from '../../hooks/graphql/mutations/tables'
import { ITablePostBody } from '../../utils/interfaces/table'
import { errorNotification } from '../../utils/notifications'
import TableForm from './TableForm'

export function CreateTableModal() {
    const [form] = useForm()

    const {
        tablesState: [tables, setTables],
        createTableModalVisibilityState: [isVisible, setIsVisible]
    } = useContext(tablesContext)

    const [isLoading, setIsLoading] = useState(false)

    const createTable = useCreateTable()

    function onOk() {
        setIsLoading(true)
        form.validateFields()
            .then((body: ITablePostBody) => {
                createTable(body, (table) => setTables([...tables, table]))
                setIsLoading(false)
                close()
            })
            .catch(() => errorNotification('Validation Error'))
    }

    function close() {
        setIsVisible(false)
        form.resetFields()
    }

    return (
        <Modal
            visible={isVisible}
            title={
                <>
                    <ToolOutlined style={{ fontSize: 22 }} /> Create Table
                </>
            }
            onOk={onOk}
            okButtonProps={{ loading: isLoading }}
            onCancel={close}
        >
            <TableForm form={form} />
        </Modal>
    )
}
