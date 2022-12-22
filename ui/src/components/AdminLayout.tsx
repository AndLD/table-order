import { Layout, Typography } from 'antd'
import '../styles/AdminLayout.scss'
import AdminHeader from './AdminLayout/AdminHeader'
import AdminMenu from './AdminLayout/AdminMenu'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { appContext } from '../contexts'
const logo = require('../assets/auth3.png')

const { Sider, Content } = Layout

function AdminLayout() {
    const {
        titleState: [title],
        isMenuCollapsedState: [isMenuCollapsed]
    } = useContext(appContext)

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsed={isMenuCollapsed}>
                <div className="logo">
                    <img src={logo} alt="Admin Page Logo" />
                    <div
                        style={{
                            opacity: isMenuCollapsed ? 0 : 1,
                            transition: 'opacity ease 0.5s'
                        }}
                    >
                        {isMenuCollapsed ? null : 'Table order'}
                    </div>
                </div>
                <AdminMenu />
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bottom: 10,
                        color: 'white'
                    }}
                >
                    All rights reserved.
                </div>
            </Sider>
            <Layout className="site-layout">
                <AdminHeader />
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <Typography.Title level={1}>{title}</Typography.Title>
                    </div>

                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
