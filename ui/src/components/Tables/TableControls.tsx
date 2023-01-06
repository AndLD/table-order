import DeleteTableBtn from './DeleteTableBtn'
import TablesDatePicker from './TablesDatePicker'
import UpdateTableBtn from './UpdateTableBtn'

export default function TableControls() {
    return (
        <div style={{ textAlign: 'right', margin: '0 0 16px 0' }}>
            <TablesDatePicker />
            <UpdateTableBtn />
            <DeleteTableBtn />
        </div>
    )
}
