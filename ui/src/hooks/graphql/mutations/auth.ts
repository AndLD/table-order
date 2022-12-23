import { useMutation } from '@apollo/client'
import { useContext } from 'react'
import { appContext } from '../../../contexts'
import { LOGIN } from '../../../graphql/mutations/auth'
import { IAuthPostBody } from '../../../utils/interfaces/auth'
import { errorNotification } from '../../../utils/notifications'

export function useLogin() {
    const [_, setToken] = useContext(appContext).tokenState

    const [loginMutation] = useMutation(LOGIN, { ignoreResults: true })

    return (user: IAuthPostBody) => {
        loginMutation({
            variables: {
                input: user
            }
        })
            .then(({ data }) => {
                if (data.login) {
                    setToken(data.login)
                }
            })
            .catch((err) => {
                const errors = err.graphQLErrors

                errorNotification(errors.join('\n'), 'Помилка входу в систему')
            })
    }
}
