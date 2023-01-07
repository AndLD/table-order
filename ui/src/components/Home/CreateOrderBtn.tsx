import { Button, FormInstance } from 'antd'
import { useContext, useState } from 'react'
import { appContext, tablesContext } from '../../contexts'
import { useCreateOrder } from '../../hooks/graphql/mutations/orders'
import { successNotification } from '../../utils/notifications'

interface ICreateOrderBtnProps {
    form: FormInstance<any>
}

export default function CreateOrderBtn({ form }: ICreateOrderBtnProps) {
    const {
        selectedTableState: [selectedTable, setSelectedTable],
        selectedTimestampState: [selectedTimestamp]
    } = useContext(tablesContext)

    const [isLoading, setIsLoading] = useState(false)

    const [orders, setOrders] = useContext(appContext).ordersState

    const createOrder = useCreateOrder()

    function onClick() {
        if (selectedTable) {
            form.validateFields().then((value) => {
                const body = {
                    ...value,
                    timestamp: selectedTimestamp,
                    tableId: selectedTable.id
                }

                setIsLoading(true)

                createOrder(body, (result) => {
                    setIsLoading(false)
                    setSelectedTable(null)
                    setOrders([...orders, result])
                    form.resetFields()
                    successNotification('Замовлення підтверджено')
                })
            })
        }
    }

    return (
        <Button
            loading={isLoading}
            className="create-order-btn"
            type="primary"
            disabled={!selectedTable}
            onClick={onClick}
        >
            Замовити
        </Button>
    )
}
