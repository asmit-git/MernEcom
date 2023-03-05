import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ProductCard from '../Components/Products/ProductCard'
import ShopSidebar from '../Components/SidebarMenu/ShopSidebar'
import Layout from '../Layout/Layout'

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState("");
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/products-lists/${page}`);
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting products");
        }
    };
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-categories`);
            if (data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };

    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filtered-products`, {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    //get Total products count
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/products-count`);
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    //load more oroducts
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/products-lists/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getTotal();
        getAllCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!checked.length || radio.length === 0) getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length !== 0) filterProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked, radio]);

    return (
        <Layout title={"Home Page"}>
            <div className="container m-auto md:px-12 lg:py-0 lg:px-7">
                <div className='flex my-10'>
                    <div className='h-screen'>
                        <ShopSidebar
                            categories={categories}
                            checked={checked}
                            setChecked={setChecked}
                            radio={radio}
                            setRadio={setRadio}
                        />
                    </div>
                    <div className='flex-1 lg:flex-auto lg:w-10/12 p-5'>
                        <div className="min-h-screen">
                            <div className="container mx-auto">
                                <div className="flex flex-wrap items-center justify-center max-h-[85%] overflow-y-auto">
                                    {products && products.map((product) => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                                <div className="text-center w-full mt-3">
                                    {products.length>0 && products.length < total && (
                                        <button
                                            className="p-3 m-3 rounded-md border border-transparent font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setPage(page + 1);
                                            }}
                                        >
                                            {loading ? "Loading ..." : "Loadmore"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Home