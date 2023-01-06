import { CreateTableModal } from '../components/Tables/CreateTableModal'
import TablesMap from '../components/Tables/TablesMap'
import { UpdateTableModal } from '../components/Tables/UpdateTableModal'
import { tablesContext } from '../contexts'
import { useTitle } from '../hooks/app'
import { useTablesContextValue } from '../hooks/tables'

export default function Tables() {
    useTitle('Столи')

    return (
        <tablesContext.Provider value={useTablesContextValue()}>
            <TablesMap />
            <CreateTableModal />
            <UpdateTableModal />
        </tablesContext.Provider>
    )
}
