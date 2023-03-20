import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/auth';
import { useCart } from '../Context/cart';
import Layout from '../Layout/Layout'

const Cart = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [payment, setPayment] = useState("");
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState("");
    const cartTotal = () => {
        try {
            let total = 0;
            cart?.map((item) => total = total + item.price)
            return total;
        } catch (error) {
            console.log(error)
        }
    }
    const removeCartItem = (id) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === id);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    }
    const placeOrder = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/order/place-order`, {
                cart,
                payment,
                address,
                phone,
                amount: cartTotal()
            });
            if (data?.success) {
                toast.success(`${data.message}`);
                localStorage.removeItem("cart");
                setCart([]);
                navigate("/dashboard/user/orders");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("somthing went wrong creating category");
        }
    }

    return (
        <Layout>
            <div className="min-h-screen pt-20">
                {cart && cart.length > 0 ?
                    <>
                        <h1 className="mb-10 text-center text-2xl font-bold dark:text-gray-300">Cart Items</h1>
                        <div className='md:flex justify-center max-w-5xl mx-auto'>
                            <div className='md:flex-1'>
                                {cart && cart.map((item) => (
                                    <div key={item._id} className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                                        <div className="rounded-lg md:w-2/3">
                                            <div className="justify-between mb-6 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md sm:flex sm:justify-start">
                                                <img className="relative w-40" src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${item._id}`} alt={item.name} />
                                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                                    <div className="mt-5 sm:mt-0">
                                                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-300">{item.name}</h2>
                                                    </div>
                                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                                        <div className="flex items-center border-gray-100">
                                                            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-gray-500 hover:text-blue-50"> - </span>
                                                            <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" defaultValue={2} min={1} />
                                                            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-gray-500 hover:text-blue-50"> + </span>
                                                        </div>
                                                        <div className="flex items-center space-x-4">
                                                            <p className="text-sm dark:text-gray-300">Rs. {item.price}</p>
                                                            <svg onClick={() => removeCartItem(item._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500 dark:text-gray-300">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 h-full rounded-lg border bg-white dark:bg-gray-800 p-6 shadow-md md:mt-0 md:w-1/3">
                                <div className="mb-2 flex justify-between">
                                    <p className="text-gray-700 dark:text-gray-300">Subtotal</p>
                                    <p className="text-gray-700 dark:text-gray-300">Rs.{cartTotal()}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-700 dark:text-gray-300">Shipping</p>
                                    <p className="text-gray-700 dark:text-gray-300">Rs.100</p>
                                </div>
                                <hr className="my-4" />
                                <div className="flex justify-between">
                                    <p className="text-lg font-bold dark:text-gray-300">Total</p>
                                    <div className>
                                        <p className="mb-1 text-lg font-bold dark:text-gray-300">Rs.{cartTotal() + 100}</p>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                {auth?.user ?
                                    <>
                                        <div className="flex flex-col w-full">
                                            <label htmlFor="price" className="mt-4 mb-1 uppercase text-grey-darker text-xs font-normal">Shipping (delivery) Address</label>
                                            <div className="flex flex-row">
                                                <input type="text" name="address" onChange={(e) => setAddress(e.target.value)} value={address} className="bg-grey-lighter text-grey-darker py-2 px-2 rounded text-grey-darkest border border-grey-lighter rounded-l-none font-normal" required />
                                            </div>
                                            <label htmlFor="price" className="mt-4 mb-1 uppercase text-grey-darker text-xs font-normal">Receiver Contact Number</label>
                                            <div className="flex flex-row">
                                                <input type="number" name="phone" onChange={(e) => setPhone(e.target.value)} value={phone} className="bg-grey-lighter text-grey-darker py-2 px-2 rounded text-grey-darkest border border-grey-lighter rounded-l-none font-normal" required />
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        <div>
                                            <div className="flex items-center mb-4">
                                                <input id="payment" type="radio" onChange={(e) => setPayment(e.target.value)} name="payment" value="cash" className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="payment" aria-describedby="payment" />
                                                <label htmlFor="payment" className="text-sm font-medium text-gray-900 ml-2 block">
                                                    Cash on Delivery
                                                </label>
                                            </div>
                                        </div>
                                        <button onClick={placeOrder} className="mt-6 w-full rounded-md py-1.5 font-medium text-gray-300 dark:bg-gray-700 bg-gray-900 hover:bg-gray-800 active:bg-gray-700 focus:bg-gray-800">Check out</button>
                                    </>
                                    :
                                    <NavLink to='/login' state="/cart" className="mt-6 w-full rounded-md py-1.5 font-medium text-gray-300 dark:bg-gray-700 bg-gray-900 hover:bg-gray-800 active:bg-gray-700 focus:bg-gray-800">Please Login to Check out</NavLink>
                                }
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className='text-center'>
                            <h1 className="mb-10 text-center text-2xl font-bold">Cart Empty</h1>
                            <NavLink to='/' type="button" title="Start buying" className="w-full py-3 px-6 text-center transition dark:bg-gray-700 bg-gray-700 hover:bg-gray-900 active:bg-gray-900 focus:bg-gray-900 md:w-max">
                                <span className="block text-white font-semibold">
                                    Continue Shopping
                                </span>
                            </NavLink>
                        </div>
                    </>
                }
            </div>
        </Layout>
    )
}

export default Cart