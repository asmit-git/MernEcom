import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const ProductCard = ({ product }) => {
    return (
        <NavLink to={`/product/${product.slug}`} key={product._id} className="flex-shrink-0 m-2 relative overflow-hidden bg-orange-500 rounded-lg max-w-[75%] sm:max-w-xs shadow-lg">
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
    )
}

export default ProductCard