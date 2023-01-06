import { useMutation } from '@apollo/client'
import { useContext } from 'react'
import { appContext } from '../../../contexts'
import { CREATE_TABLE, UPDATE_TABLE } from '../../../graphql/mutations/tables'
import { ITable, ITablePostBody, ITablePutBody } from '../../../utils/interfaces/table'
import { errorNotification } from '../../../utils/notifications'

export function useCreateTable() {
    const [token] = useContext(appContext).tokenState

    const [createTableMutation] = useMutation(CREATE_TABLE, {
        ignoreResults: true,
        context: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    })

    return (table: ITablePostBody, callback: (result: ITable) => void) => {
        createTableMutation({
            variables: {
                input: table
            }
        })
            .then(({ data }) => {
                if (data.createTable) {
                    callback(data.createTable)
                }
            })
            .catch((err) => {
                const errors = err.graphQLErrors

                errorNotification(errors.join('\n'), 'Помилка створення столу')
            })
    }
}

export function useUpdateTable() {
    const [token] = useContext(appContext).tokenState

    const [updateTableMutation] = useMutation(UPDATE_TABLE, {
        ignoreResults: true,
        context: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    })

    return (id: string, table: ITablePutBody, callback: (result: ITable) => void) => {
        updateTableMutation({
            variables: {
                id,
                input: table
            }
        })
            .then(({ data }) => {
                if (data.updateTable) {
                    callback(data.updateTable)
                }
            })
            .catch((err) => {
                const errors = err.graphQLErrors

                errorNotification(errors.join('\n'), 'Помилка змінення столу')
            })
    }
}
