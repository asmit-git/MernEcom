import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserMenu from '../../Components/SidebarMenu/UserMenu'
import Layout from '../../Layout/Layout'
import moment from 'moment';

const SingleOrder = () => {
    const [order, setOrder] = useState([])
    const params = useParams();
    const getUserOrder = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/order/single-order/${params.orderId}`);
            if (data.success) {
                setOrder(data.order);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting orders");
        }
    };

    useEffect(() => {
        getUserOrder();
    }, []);

    const itemTotal = () => {
        try {
            let total = 0;
            order[0]?.products.map((item) => total = total + item.price)
            return total;
        } catch (error) {
            console.log(error)
        }
    }

    console.log(order)

    return (
        <Layout title={"Dashboard - Ecommerce App"}>
            <div className="container m-auto md:px-12 lg:py-0 lg:px-7">
                <div className='flex my-10'>
                    <div className='h-screen'>
                        <UserMenu />
                    </div>
                    <div className='flex-1 lg:flex-auto lg:w-10/12 p-5 overflow-auto h-screen'>
                        <div className="flex justify-start item-start space-y-2 flex-col">
                            <h1 className="text-sm dark:text-white lg:text-md font-bold text-gray-800">#{order[0]?._id}</h1>
                            <p className="text-base dark:text-gray-300 font-small leading-6 text-gray-600">{moment(order[0]?.createdAt).format('MMMM Do YYYY, h:mm:ss')}</p>
                        </div>
                        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-start w-10/12 xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                                <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                    <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Order Items</p>
                                    {order[0]?.products.map((item) => (
                                        <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                            <img src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${item._id}`} alt={item.name} />
                                            <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{item.name}</h3>
                                            <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">01</p>
                                            <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">Rs.{item.price}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center flex-col md:flex-row items-start w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                                        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                            <div className="flex justify-between w-full">
                                                <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                                                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">Rs. {itemTotal()}</p>
                                            </div>
                                            <div className="flex justify-between items-center w-full">
                                                <p className="text-base dark:text-white leading-4 text-gray-800">Discount</p>
                                                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">Rs.0</p>
                                            </div>
                                            <div className="flex justify-between items-center w-full">
                                                <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                                                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">Rs.0</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">Rs. {order[0]?.amount}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-col md:flex-row items-start w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping Details</h3>
                                        <div className="flex justify-start w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-left md:text-left text-sm leading-5 text-gray-600">{order[0]?.receiver.address}</p>
                                            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-left md:text-left text-sm leading-5 text-gray-600">{order[0]?.receiver.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SingleOrder