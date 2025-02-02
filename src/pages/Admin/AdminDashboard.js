import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
    const [auth] = useAuth()
    return (
        <Layout title={'Admin DashBoard'} >
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h1>Admin Name :{auth?.user?.name}</h1>
                            <h1>Admin email :{auth?.user?.email}</h1>
                            <h1>Admin phone :{auth?.user?.phone}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )//we have to render this conditionally 
}

export default AdminDashboard