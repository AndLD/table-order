import { Menu } from 'antd'
import { BuildOutlined, TeamOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { appContext } from '../../contexts'

export default function AdminMenu() {
    const [isMenuCollapsed] = useContext(appContext).isMenuCollapsedState

    const location = useLocation()

    const style = {
        fontSize: '25px',
        transform: isMenuCollapsed ? 'translateX(-25%)' : ''
    }

    return (
        <Menu
            style={{ fontSize: '15px' }}
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname || '/admin']}
            items={[
                {
                    key: '/admin/tables',
                    icon: <BuildOutlined style={style} />,
                    label: <Link to={'/admin/tables'}>Столи</Link>
                },
                {
                    key: '/admin/orders',
                    icon: <TeamOutlined style={style} />,
                    label: <Link to={'/admin/orders'}>Замовлення</Link>
                }
            ]}
        />
    )
}
