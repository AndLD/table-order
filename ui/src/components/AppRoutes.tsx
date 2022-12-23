import { useEffect, useState } from 'react'
import { Navigate, useRoutes } from 'react-router'
import { RouteObject } from 'react-router-dom'
import { useAuth } from '../hooks/auth'
import { useToken } from '../hooks/app'
import Orders from '../pages/Orders'
import Auth from '../pages/Auth'
import Tables from '../pages/Tables'
import AdminLayout from './AdminLayout'
import Home from '../pages/Home'

const privateRoutes: RouteObject[] = [
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '/admin/orders',
                element: <Orders />
            },
            {
                path: '/admin/tables',
                element: <Tables />
            }
        ]
    },
    {
        path: '/',
        element: <Home />
    }
]

const publicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/auth',
        element: <Auth />
    }
]

export default function AppRoutes() {
    const token = useToken()

    const [routes, setRoutes] = useState<RouteObject[]>([])
    const [redirectRoute, setRedirectRoute] = useState<string | null>(null)

    useEffect(() => {
        if (token) {
            setRoutes(privateRoutes)
            setRedirectRoute('/admin/tables')
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
