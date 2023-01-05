import { Button, Popconfirm, Table } from 'antd'
import { useState } from 'react'
import { useTitle } from '../hooks/app'
import { useDeleteOrder } from '../hooks/graphql/mutations/orders'
import { useGetAllOrders } from '../hooks/graphql/queries/orders'
import { IOrder } from '../utils/interfaces/order'

export default function Orders() {
    useTitle('Замовлення')

    const [isTableLoading, setIsTableLoading] = useState(true)
    const [orders, setOrders] = useState<IOrder[]>([])
    const [selectedRows, setSelectedRows] = useState<IOrder[]>([])

    useGetAllOrders((result) => {
        setOrders(result)
        setIsTableLoading(false)
    })
    const deleteOrder = useDeleteOrder()

    return (
        <>
            <div style={{ textAlign: 'right', margin: '0 0 16px 0' }}>
                <Popconfirm
                    disabled={selectedRows.length !== 1}
                    title="Are you sure to delete?"
                    onConfirm={() =>
                        deleteOrder(selectedRows[0].id, (result) => {
                            if (result) {
                                setOrders(orders.filter((order) => order.id !== selectedRows[0].id))
                                setSelectedRows([])
                            }
                        })
                    }
                    okText="Yes"
                    cancelText="No"
                >
                    <Button style={{ margin: '0 0 0 5px' }} type="primary" disabled={selectedRows.length !== 1}>
                        Delete
                    </Button>
                </Popconfirm>
            </div>

            <Table
                rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys: selectedRows.map((row: any) => row.id),
                    onChange: (_: any, selectedRows: any) => {
                        setSelectedRows(selectedRows)
                    }
                }}
                columns={[
                    {
                        title: '#',
                        render: (_, row, index) => index + 1,
                        width: 70
                    },
                    {
                        title: 'ID',
                        dataIndex: 'id'
                    },
                    {
                        title: 'Table ID',
                        dataIndex: 'tableId'
                    },
                    {
                        title: 'Timestamp',
                        dataIndex: 'timestamp',
                        render: (value: number) => value && new Date(value).toLocaleString(),
                        sorter: (row1: any, row2: any) => row1.timestamp - row2.timestamp,
                        sortDirections: ['descend']
                    },
                    {
                        title: 'Name',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email'
                    },
                    {
                        title: 'Address',
                        dataIndex: 'address'
                    }
                ]}
                rowKey={(record: any) => record.id}
                dataSource={orders}
                loading={isTableLoading}
            />
        </>
    )
}
