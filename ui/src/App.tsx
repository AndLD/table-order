import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.variable.min.css'
import AppRoutes from './components/AppRoutes'
import { appContext } from './contexts'
import { useAppContextValue } from './hooks/app'
import { ConfigProvider } from 'antd'
import { useEffect } from 'react'
import { useAuth } from './hooks/auth'

export default function App() {
    const tokenState = useAuth()

    useEffect(() => {
        ConfigProvider.config({
            theme: {
                primaryColor: '#F69D07'
            }
        })
    }, [])

    const appContextValue = useAppContextValue(tokenState)

    return (
        <ConfigProvider>
            <appContext.Provider value={appContextValue}>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </appContext.Provider>
        </ConfigProvider>
    )
}
