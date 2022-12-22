import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { useContext } from 'react'
import { appContext } from '../../contexts'
import { LOGIN } from '../../graphql/mutations/auth'
import { IAuthPostBody } from '../../utils/interfaces/auth'
import { errorNotification } from '../../utils/notifications'
import { validationRules } from '../../utils/validation'

export default function SigninForm() {
    const [form] = Form.useForm()
    const [_, setToken] = useContext(appContext).tokenState

    const [loginMutation] = useMutation(LOGIN)

    function login(user: IAuthPostBody) {
        loginMutation({
            variables: {
                input: user
            }
        }).then(({ data, errors }) => {
            if (data) {
                setToken(data)
            } else if (errors) {
                errorNotification(errors[0].message, 'Помилка входу в систему')
            }
        })
    }

    return (
        <Form form={form} name="basic" onFinish={login} autoComplete="off" className="auth-form">
            <Form.Item name="username" rules={[validationRules.REQUIRED('Будь-ласка введіть Ваш логін!')]}>
                <Input type="text" placeholder="Username" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[validationRules.REQUIRED('Будь-ласка введіть Ваш пароль!'), validationRules.PASSWORD()]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>

            <div className="buttons-style">
                <Button className="button" htmlType="submit" type="primary">
                    Вхід
                </Button>
            </div>
        </Form>
    )
}
