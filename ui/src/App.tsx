import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.min.css'
import AppRoutes from './components/AppRoutes'
import { appContext } from './contexts'
import { useAppContextValue } from './hooks/app'

export default function App() {
    return (
        <appContext.Provider value={useAppContextValue()}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </appContext.Provider>
    )
}
