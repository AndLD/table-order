import { useEffect, useState } from 'react'
import { Navigate, useRoutes } from 'react-router'
import { RouteObject } from 'react-router-dom'
import { useAuth } from '../hooks/auth'
import { useToken } from '../hooks/app'
import Admin from '../pages/Admin'
import Auth from '../pages/Auth'
import Tables from '../pages/Tables'

const privateRoutes: RouteObject[] = [
    {
        path: '/admin',
        element: <Admin />
    },
    {
        path: '/tables',
        element: <Tables />
    }
]

const publicRoutes: RouteObject[] = [
    {
        path: '/tables',
        element: <Tables />
    },
    {
        path: '/auth',
        element: <Auth />
    }
]

export default function AppRoutes() {
    useAuth()

    const token = useToken()

    const [routes, setRoutes] = useState<RouteObject[]>([])
    const [redirectRoute, setRedirectRoute] = useState<string | null>(null)

    useEffect(() => {
        if (token) {
            setRoutes(privateRoutes)
            setRedirectRoute('/admin')
        } else {
            setRoutes(publicRoutes)
            setRedirectRoute('/auth')
        }
    }, [token])

    const routing = useRoutes(
        redirectRoute ? [...routes, { path: '*', element: <Navigate replace to={redirectRoute} /> }] : routes
    )

    return <>{routing}</>
}
