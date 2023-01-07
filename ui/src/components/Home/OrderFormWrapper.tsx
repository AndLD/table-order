import { Typography } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import TablesDatePicker from '../Tables/TablesDatePicker'
import CreateOrderBtn from './CreateOrderBtn'
import OrderForm from './OrderForm'

export function OrderFormWrapper() {
    const [form] = useForm()

    return (
        <div className="order-form-wrapper">
            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                Замовити стіл
            </Typography.Title>
            <div className="table-date-picker-wrapper">
                <TablesDatePicker />
            </div>
            <OrderForm form={form} />
            <CreateOrderBtn form={form} />
        </div>
    )
}
