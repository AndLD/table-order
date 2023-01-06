import { createContext } from 'react'
import { useAppContextValue } from './hooks/app'
import { useTablesContextValue } from './hooks/tables'

export const appContext = createContext({} as ReturnType<typeof useAppContextValue>)
export const tablesContext = createContext({} as ReturnType<typeof useTablesContextValue>)
