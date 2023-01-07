import { Form, FormInstance, Input } from 'antd'
import { useContext } from 'react'
import { appContext, tablesContext } from '../../contexts'

interface ICreateOrderForm {
    form: FormInstance<any>
}

export default function OrderForm({ form }: ICreateOrderForm) {
    const {
        selectedTableState: [selectedTable]
    } = useContext(tablesContext)

    const [orders] = useContext(appContext).ordersState

    return (
        <Form style={{ display: selectedTable ? 'block' : 'none' }} form={form}>
            <Form.Item
                name="name"
                label="Ім'я"
                rules={[
                    {
                        required: true,
                        message: 'Обов`язкове поле'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        required: true,
                        message: 'Обов`язкове поле'
                    }
                ]}
            >
                <Input type="email" />
            </Form.Item>
            <Form.Item
                name="address"
                label="Адреса"
                rules={[
                    {
                        required: true,
                        message: 'Обов`язкове поле'
                    }
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
    )
}
