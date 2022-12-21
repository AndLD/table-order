import { useState, useContext } from 'react'
import { appContext } from '../contexts'

export function useAppContextValue() {
    const tokenState = useState<string | null>(localStorage.getItem('token') || null)

    return {
        tokenState
    }
}

export function useToken() {
    const [token] = useContext(appContext).tokenState

    return token
}
