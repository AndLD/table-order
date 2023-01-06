import { Form, FormInstance, InputNumber, Select } from 'antd'
import { useContext, useEffect } from 'react'
import { tablesContext } from '../../contexts'

interface ITableFormProps {
    form: FormInstance<any>
}

export default function CreateTableForm({ form }: ITableFormProps) {
    const {
        tableInitialValuesState: [initialValues],
        createTableModalVisibilityState: [isCreateTableModalVisible]
    } = useContext(tablesContext)

    useEffect(() => {
        form.setFieldsValue({
            ...initialValues,
            shape: initialValues?.shape || 'rectangular',
            seats: initialValues?.seats || 4,
            width: initialValues?.width || 100,
            height: initialValues?.height || 100
        })
    }, [initialValues])

    return (
        <Form form={form}>
            <Form.Item
                name="shape"
                label="Shape"
                required
                rules={[
                    {
                        required: true,
                        message: 'Shape is required'
                    }
                ]}
            >
                <Select
                    options={[
                        {
                            value: 'oval',
                            label: 'Oval'
                        },
                        {
                            value: 'rectangular',
                            label: 'Rectangular'
                        }
                    ]}
                />
            </Form.Item>

            <Form.Item
                name="seats"
                label="Seats"
                required
                rules={[
                    {
                        required: true,
                        message: 'Seats is required'
                    }
                ]}
            >
                <InputNumber style={{ width: 75 }} />
            </Form.Item>

            <Form.Item
                name="width"
                label="Width"
                required
                rules={[
                    {
                        required: true,
                        message: 'Width is required'
                    }
                ]}
            >
                <InputNumber style={{ width: 75 }} />
            </Form.Item>
            <Form.Item
                name="height"
                label="Height"
                required
                rules={[
                    {
                        required: true,
                        message: 'Height is required'
                    }
                ]}
            >
                <InputNumber style={{ width: 75 }} />
            </Form.Item>

            <Form.Item
                name="x"
                label="X"
                required
                rules={[
                    {
                        required: true,
                        message: 'X is required'
                    }
                ]}
            >
                <InputNumber disabled={isCreateTableModalVisible} style={{ width: 75 }} />
            </Form.Item>
            <Form.Item
                name="y"
                label="Y"
                required
                rules={[
                    {
                        required: true,
                        message: 'Y is required'
                    }
                ]}
            >
                <InputNumber disabled={isCreateTableModalVisible} style={{ width: 75 }} />
            </Form.Item>
        </Form>
    )
}
