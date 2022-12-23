import { Button, Form, Input } from 'antd'
import { useLogin } from '../../hooks/graphql/mutations/auth'
import { validationRules } from '../../utils/validation'

export default function SigninForm() {
    const [form] = Form.useForm()
    const login = useLogin()

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
