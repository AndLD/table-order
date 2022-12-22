import '../styles/Auth.scss'
import { useEffect } from 'react'
import SigninForm from '../components/Auth/SigninForm'

const icon1 = require('../assets/auth1.png')
const icon2 = require('../assets/auth2.png')
const icon3 = require('../assets/auth3.png')

export default function Auth() {
    useEffect(() => {
        document.title = 'Auth'
    }, [])

    return (
        <div className="auth-container">
            <div className="ellipse" />

            <div className="all-group">
                <div className="group">
                    <div className="page-title">
                        <h1 className="title">Table order</h1>
                        <h4 className="sub-title">admin</h4>
                    </div>

                    <div className="page-form">
                        <SigninForm />
                    </div>
                </div>

                <div className="page-icons">
                    <img src={icon1} className="icon" alt="icon1" />
                    <img src={icon3} className="icon" alt="icon3" />
                    <img src={icon2} className="icon" alt="icon2" />
                </div>
            </div>
        </div>
    )
}
