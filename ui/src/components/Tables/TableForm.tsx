import { Form, FormInstance, Input, Select } from 'antd'
import { useContext } from 'react'
import { tablesContext } from '../../contexts'

interface ITableFormProps {
    form: FormInstance<any>
}

export default function CreateTableForm({ form }: ITableFormProps) {
    const [initialValues] = useContext(tablesContext).tableInitialValuesState

    return (
        <Form form={form} initialValues={{ ...initialValues, shape: 'rectangular', width: 100, height: 100 }}>
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
                <Input style={{ width: 75 }} type="number" />
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
                <Input style={{ width: 75 }} type="number" />
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
                <Input disabled style={{ width: 75 }} />
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
                <Input disabled style={{ width: 75 }} />
            </Form.Item>
        </Form>
    )
}
