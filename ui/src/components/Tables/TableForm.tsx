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
                label="Форма"
                rules={[
                    {
                        required: true,
                        message: 'Обов`язкове поле'
                    }
                ]}
            >
                <Select
                    options={[
                        {
                            value: 'oval',
                            label: 'Овальний'
                        },
                        {
                            value: 'rectangular',
                            label: 'Прямокутний'
                        }
                    ]}
                />
            </Form.Item>

            <Form.Item
                name="seats"
                label="Місця"
                rules={[
                    {
                        required: true,
                        message: 'Обов`язкове поле'
                    }
                ]}
            >
                <InputNumber style={{ width: 75 }} />
            </Form.Item>

            <Form.Item
                name="width"
                label="Ширина"
                rules={[
                    {
                        required: true,
                        message: 'Обов`язкове поле'
                    }
                ]}
            >
                <InputNumber style={{ width: 75 }} />
            </Form.Item>
            <Form.Item
                name="height"
                label="Висота"
                rules={[
                    {
                        required: true,
                        message: 'Обов`язкове поле'
                    }
                ]}
            >
                <InputNumber style={{ width: 75 }} />
            </Form.Item>

            <Form.Item
                name="x"
                label="X"
                rules={[
                    {
                        required: true,
                        message: 'Обов`язкове поле'
                    }
                ]}
            >
                <InputNumber disabled={isCreateTableModalVisible} style={{ width: 75 }} />
            </Form.Item>
            <Form.Item
                name="y"
                label="Y"
                rules={[
                    {
                        required: true,
                        message: 'Обов`язкове поле'
                    }
                ]}
            >
                <InputNumber disabled={isCreateTableModalVisible} style={{ width: 75 }} />
            </Form.Item>
        </Form>
    )
}
