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
            format="YYYY-MM-DD HH:mm"
            disabledDate={(current) => {
                let customDate = moment().format('YYYY-MM-DD HH:mm')
                return current && current < moment(customDate, 'YYYY-MM-DD HH:mm')
            }}
            showTime
            onChange={(value) => {
                setSelectedTimestamp(value ? value.unix() * 1000 : null)
            }}
        />
    )
}
