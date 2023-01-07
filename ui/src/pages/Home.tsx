import { OrderFormWrapper } from '../components/Home/OrderFormWrapper'
import UserTablesMap from '../components/Home/UserTablesMap'
import { tablesContext } from '../contexts'
import { useTitle } from '../hooks/app'
import { useTablesContextValue } from '../hooks/tables'

export default function Home() {
    useTitle('Table order')

    return (
        <tablesContext.Provider value={useTablesContextValue()}>
            <div className="home">
                <UserTablesMap />
                <OrderFormWrapper />
            </div>
        </tablesContext.Provider>
    )
}
