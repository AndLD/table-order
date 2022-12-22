import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.variable.min.css'
import AppRoutes from './components/AppRoutes'
import { appContext } from './contexts'
import { useAppContextValue } from './hooks/app'
import { ConfigProvider } from 'antd'
import { useEffect } from 'react'

export default function App() {
    useEffect(() => {
        ConfigProvider.config({
            theme: {
                primaryColor: '#F69D07'
            }
        })
    }, [])

    return (
        <ConfigProvider>
            <appContext.Provider value={useAppContextValue()}>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </appContext.Provider>
        </ConfigProvider>
    )
}
