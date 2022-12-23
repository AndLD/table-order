import { LogoutOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import { appContext } from '../../../contexts'

export default function useLogoutMenuItem() {
    const [_, setToken] = useContext(appContext).tokenState

    function logout() {
        setToken(null)
    }

    return {
        key: 'logout',
        icon: <LogoutOutlined onClick={logout} style={{ marginRight: '4px', fontSize: '20px' }} />,
        label: (
            <div onClick={logout} style={{ fontSize: '17px' }}>
                Вихід
            </div>
        )
    }
}
