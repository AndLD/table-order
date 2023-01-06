import { ToolOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import useFormInstance from 'antd/lib/form/hooks/useFormInstance'
import { useState } from 'react'
import CreateTableForm from './CreateTableForm'

export function CreateTableModal() {
    const [isVisible, setIsVisible] = useState(true)
    const form = useFormInstance()

    function onOk() {}

    return (
        <Modal
            visible={isVisible}
            title={
                <>
                    <ToolOutlined style={{ fontSize: 22 }} /> Create Table
                </>
            }
            onOk={onOk}
            onCancel={() => setIsVisible(false)}
        >
            <CreateTableForm form={form} />
        </Modal>
    )
}
