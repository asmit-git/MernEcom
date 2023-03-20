import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti'
import { toast } from 'react-toastify'

const ProductCard = ({ product, cart, setCart }) => {
    const addToCart = (e, product) => {
        e.preventDefault();
        setCart([...cart, product]);
        localStorage.setItem('cart', JSON.stringify([...cart, product]))
        toast.success("Item added to cart")
    }
    return (
        <div className="flex-shrink-0 m-2 relative overflow-hidden bg-orange-500 rounded-lg max-w-[75%] sm:max-w-xs shadow-lg">
            <NavLink to={`/product/${product.slug}`} key={product._id}>
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
                        <span className="block bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none items-center">Rs. {product.price}</span>
                    </div>
                </div>
            </NavLink>
            <div className="relative text-white px-6 pb-6 mt-6">
                <div className="flex justify-end">
                    <span className="block rounded-full text-white-500 text-xs font-bold px-3 py-2 leading-none items-center">                       
                            <AiOutlineShoppingCart className="cursor-pointer" size={'2rem'} onClick={(e) => addToCart(e, product)} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard