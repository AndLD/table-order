import { LogoutOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { useContext } from 'react'
import { appContext } from '../../../contexts'
import { LOGOUT } from '../../../graphql/mutations/auth'
import { errorNotification } from '../../../utils/notifications'

export default function useLogoutMenuItem() {
    const [_, setToken] = useContext(appContext).tokenState

    const [logoutMutation] = useMutation(LOGOUT)

    function logout() {
        logoutMutation()
            .then(({ data }) => {
                console.log(data)
                if (data.logout) {
                    setToken(null)
                }
            })
            .catch((err) => {
                console.log(err)
                const errors = err.graphQLErrors

                errorNotification(errors.join('\n'), 'Помилка вихіду')
            })
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
