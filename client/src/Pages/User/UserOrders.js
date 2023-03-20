import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserMenu from '../../Components/SidebarMenu/UserMenu'
import Layout from '../../Layout/Layout'
import SingleOrder from './SingleOrder'

const UserOrders = () => {
    const [orders, setOrders] = useState([])
    const getUserOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/order/user-orders`);
            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting orders");
        }
    };

    useEffect(() => {
        getUserOrders();
    }, []);


    return (
        <Layout title={"Dashboard - Ecommerce App"}>
            <div className="container m-auto md:px-12 lg:py-0 lg:px-7">
                <div className='flex my-10'>
                    <div className='h-screen'>
                        <UserMenu />
                    </div>
                    <div className='h-screen overflow-hidden lg:min-w-[75%]'>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Order Id
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.map((item) => (
                                        <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <NavLink to={`/dashboard/user/order/${item._id}`}>{item._id}</NavLink>
                                            </th>
                                            <td className="px-6 py-4">
                                                <NavLink to={`/dashboard/user/order/${item._id}`}>{item.status}</NavLink>
                                            </td>
                                            <td className="px-6 py-4">
                                                <NavLink to={`/dashboard/user/order/${item._id}`} className="flex gap-2 items-center">
                                                    <AiFillEye size={15} /><span>View Details</span>
                                                </NavLink>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserOrders