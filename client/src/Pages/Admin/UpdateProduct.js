import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminMenu from '../../Components/SidebarMenu/AdminMenu'
import Layout from '../../Layout/Layout'

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([])
    const [productImage, setProductImage] = useState("")
    const [category, setCategory] = useState("")
    const [productValues, setProductValues] = useState({
        _id: '',
        name: '',
        description: '',
        price: '',
        stocks: ''
    });

    //get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`
            );
            setProductValues(data.product);
            setCategory(data.product.category._id)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-categories`);
            if (data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting catgeory");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleProductValueChanges = (e) => {
        setProductValues({
            ...productValues,
            [e.target.name]: e.target.value
        });
    }

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', productValues.name);
        formData.append('category', category);
        formData.append('description', productValues.description);
        formData.append('price', productValues.price);
        formData.append('stocks', productValues.stocks);
        productImage && formData.append('image', productImage);
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${productValues._id}`, formData);
            if (data?.success) {
                toast.success(`${productValues.name} is updated`);
                navigate('/dashboard/admin/products')
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("somthing went wrong creating product");
        }
    }

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${productValues._id}`);
            if (data.success) {
                navigate('/dashboard/admin/products')
                toast.success("Product Deleted Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong deleting product");
        }
    }

    return (
        <Layout>
            <div className="container m-auto md:px-12 lg:py-0 lg:px-7">
                <div className='flex my-10 gap-5'>
                    <div className='h-screen'>
                        <AdminMenu />
                    </div>
                    <div className='h-screen grow'>
                        <div className="grid bg-white  dark:bg-gray-900  rounded-lg shadow-xl w-12/12">
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="flex justify-center mt-2">
                                    <div className="flex bg-gray-700 text-gray-400 hover:text-gray-300 rounded-full md:p-4 p-2 border-2 border-gray-300 dark:border-gray-700">
                                        <h3>Update Product</h3>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 mt-5 mx-7">
                                    <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Product Name</label>
                                    <input
                                        className="py-2 px-3 rounded-lg border-2 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-500 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                                        type="text"
                                        name="name"
                                        placeholder="Product Name"
                                        value={productValues.name}
                                        onChange={handleProductValueChanges}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 mt-5 mx-7">
                                    <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Description</label>
                                    <textarea
                                        className="py-2 px-3 rounded-lg border-2 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-500 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                                        type="text"
                                        name="description"
                                        placeholder="Product Description"
                                        value={productValues.description}
                                        onChange={handleProductValueChanges}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                                    <div className="grid grid-cols-1">
                                        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Price</label>
                                        <input
                                            className="py-2 px-3 rounded-lg border-2 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-500 mt-1 dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                                            type="number"
                                            name="price"
                                            placeholder="Product Price"
                                            value={productValues.price}
                                            onChange={handleProductValueChanges}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-1">
                                        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">stocks</label>
                                        <input
                                            className="py-2 px-3 rounded-lg border-2 dark:bg-gray-700 dark:text-white  border-gray-300 dark:border-gray-500 mt-1 dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                                            type="number"
                                            name="stocks"
                                            placeholder="Product stock count"
                                            value={productValues.stocks}
                                            onChange={handleProductValueChanges}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 mt-5 mx-7">
                                    <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Product Category</label>
                                    <select
                                        className="py-2 px-3 rounded-lg border-2 dark:bg-gray-700 dark:text-white  border-gray-300 dark:border-gray-500 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                                        name="category"
                                        value={category}
                                        onChange={(e) => { setCategory(e.target.value) }}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories && categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 mt-5 mx-7">
                                    {productImage ? (
                                        <img className="w-20 h-20" src={`${URL.createObjectURL(productImage)}`} alt="product" />
                                    ) : (
                                        <img className="w-20 h-20" src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${productValues._id}`} alt={productValues.name} />
                                    )}
                                    <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">Upload Photo</label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-gray-300 dark:hover:bg-gray-300 dark:border-gray-500 group">
                                            <div className="flex flex-col items-center justify-center pt-7">
                                                <svg className="w-10 h-10 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                <p className="lowercase text-sm text-gray-400 group-hover:text-gray-600 pt-1 tracking-wider">Select a photo</p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
                                    <NavLink type="button" to="/dashboard/admin/products" className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">Cancel</NavLink>
                                    <button type="submit" className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">Update</button>
                                    <button onClick={handleDelete} type="delete" className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">Delete</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct