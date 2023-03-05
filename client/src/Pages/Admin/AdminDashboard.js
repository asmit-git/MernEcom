import React from 'react'
import AdminMenu from '../../Components/SidebarMenu/AdminMenu'
import Layout from '../../Layout/Layout'

const AdminDashboard = () => {
    return (
        <Layout>
            <div className="container m-auto md:px-12 lg:py-0 lg:px-7">
                <div className='flex my-10'>
                    <div className='h-screen'>
                        <AdminMenu />
                    </div>
                    <div className='flex-1 lg:flex-auto lg:w-10/12 p-5'>
                        <p className='dark:text-white'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard