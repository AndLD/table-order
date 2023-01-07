import { DatePicker } from 'antd'
import moment from 'moment'
import { useContext } from 'react'
import { tablesContext } from '../../contexts'

export default function TablesDatePicker() {
    const {
        selectedTimestampState: [selectedTimestamp, setSelectedTimestamp]
    } = useContext(tablesContext)

    return (
        <DatePicker
            className="table-date-picker"
            format="YYYY-MM-DD HH"
            disabledDate={(current) => {
                let customDate = moment().format('YYYY-MM-DD HH')
                return current && current < moment(customDate, 'YYYY-MM-DD HH')
            }}
            showTime
            onChange={(value) => {
                setSelectedTimestamp(value ? value.unix() * 1000 : null)
            }}
            placeholder="Оберіть дату"
        />
    )
}
