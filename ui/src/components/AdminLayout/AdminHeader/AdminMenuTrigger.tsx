import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import { appContext } from '../../../contexts'

export default function AdminMenuTrigger() {
    const [isMenuCollapsed, setIsMenuCollapsed] = useContext(appContext).isMenuCollapsedState

    const onClick = () => {
        setIsMenuCollapsed(!isMenuCollapsed)
    }

    return isMenuCollapsed ? (
        <MenuUnfoldOutlined className="trigger" onClick={onClick} />
    ) : (
        <MenuFoldOutlined className="trigger" onClick={onClick} />
    )
}
