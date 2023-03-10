import AdminTablesMap from '../components/Tables/AdminTablesMap'
import { CreateTableModal } from '../components/Tables/CreateTableModal'
import TableControls from '../components/Tables/TableControls'
import { UpdateTableModal } from '../components/Tables/UpdateTableModal'
import { tablesContext } from '../contexts'
import { useTitle } from '../hooks/app'
import { useTablesContextValue } from '../hooks/tables'

export default function Tables() {
    useTitle('Столи')

    return (
        <tablesContext.Provider value={useTablesContextValue()}>
            <TableControls />
            <AdminTablesMap />
            <CreateTableModal />
            <UpdateTableModal />
        </tablesContext.Provider>
    )
}
