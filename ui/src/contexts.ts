import { createContext } from 'react'
import { useAppContextValue } from './hooks/app'

export const appContext = createContext({} as ReturnType<typeof useAppContextValue>)
