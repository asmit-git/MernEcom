import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminMenu from '../../Components/SidebarMenu/AdminMenu'
import Layout from '../../Layout/Layout'

const ProductLists = () => {
    const [products, setProducts] = useState([]);


    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/all-products`);
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting products");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);
    return (
        <Layout>
            <div className="container m-auto md:px-12 lg:py-0 lg:px-7">
                <div className='flex my-10 gap-5'>
                    <div className='h-screen'>
                        <AdminMenu />
                    </div>
                    <div className='h-screen grow bg-white  dark:bg-gray-900  rounded-lg w-12/12'>
                        <div className='flex justify-center bg-gray-200 dark:bg-gray-800 mb-2'>
                            <NavLink to="/dashboard/admin/create-product" type="button" className="bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-300 font-bold mt-10 py-2 px-4 rounded mb-10">Add New Product</NavLink>
                        </div>
                        <div className="flex flex-wrap items-center justify-center max-h-[85%] overflow-y-auto">
                            {products && products.map((product) => (
                                <NavLink to={`/dashboard/admin/${product.slug}`} key={product._id} className="flex-shrink-0 m-2 relative overflow-hidden bg-orange-500 rounded-lg max-w-[75%] sm:max-w-xs shadow-lg">
                                    <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: 'scale(1.5)', opacity: '0.1' }}>
                                        <rect x="159.52" y={175} width={152} height={152} rx={8} transform="rotate(-45 159.52 175)" fill="white" />
                                        <rect y="107.48" width={152} height={152} rx={8} transform="rotate(-45 0 107.48)" fill="white" />
                                    </svg>
                                    <div className="relative pt-10 px-10 flex items-center justify-center">
                                        <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{ background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: '0.2' }} />
                                        <img className="relative w-40" src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${product._id}`} alt={product.name} />
                                    </div>
                                    <div className="relative text-white px-6 pb-6 mt-6">
                                        <span className="block opacity-75 -mb-1">{product.category.name}</span>
                                        <div className="flex justify-between">
                                            <span className="block font-semibold text-xl">{product.name}</span>
                                            <span className="bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">Rs. {product.price}</span>
                                        </div>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductLists