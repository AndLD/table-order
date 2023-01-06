import { ToolOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useContext } from 'react'
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

    const createTable = useCreateTable()

    function onOk() {
        form.validateFields()
            .then((body: ITablePostBody) => {
                createTable(body, (table) => setTables([...tables, table]))
            })
            .catch(() => errorNotification('Validation Error'))
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
            onCancel={() => {
                setIsVisible(false)
                form.resetFields()
            }}
        >
            <TableForm form={form} />
        </Modal>
    )
}
