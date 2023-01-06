import { Form, FormInstance, Input, Select } from 'antd'
import { ITablePutBody } from '../../utils/interfaces/table'

interface ICreateTableFormProps {
    form: FormInstance<any>
    initialValues?: ITablePutBody
}

export default function CreateTableForm({ form, initialValues }: ICreateTableFormProps) {
    return (
        <Form form={form} initialValues={{ ...initialValues, shape: 'rectangular', width: 100, height: 100 }}>
            <Form.Item name="shape" label="Shape">
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

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <Form.Item name="width" label="Width">
                    <Input />
                </Form.Item>
                <Form.Item name="height" label="Height">
                    <Input />
                </Form.Item>

                <Form.Item name="x" label="X">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="y" label="Y">
                    <Input disabled />
                </Form.Item>
            </div>
        </Form>
    )
}
