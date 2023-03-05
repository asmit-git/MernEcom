import React from 'react'
import { Prices } from '../Prices';

const ShopSidebar = ({ categories, checked, setChecked, radio, setRadio }) => {
    const filterByCategory = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    }
    return (
        <div className="flex flex-col items-center w-75 overflow-hidden text-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-900 rounded">
            <div className="flex items-center w-full px-3 mt-3">
                <span className="ml-2 text-md font-bold">Filter by Category</span>
            </div>
            <div className="w-full px-2">
                <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                    {categories && categories.map((category) => (
                        <div key={category._id} className="flex items-center w-full h-10 px-3 rounded hover:bg-gray-700 hover:text-gray-300">
                            <input type="checkbox" className="accent-pink-500" onChange={(e) => filterByCategory(e.target.checked, category._id)} />
                            <span className="ml-2 text-sm font-bold">{category.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center w-full px-3 mt-3">
                <span className="ml-2 text-md font-bold">Filter by Price</span>
            </div>
            <div className="w-full px-2">
                <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                    <div>
                        {Prices?.map((price) => (
                            <div key={price.id} className="flex items-center w-full h-10 px-3 rounded hover:bg-gray-700 hover:text-gray-300">
                                <input
                                    key={price.id}
                                    type="radio"
                                    name="radio"
                                    className="h-4 w-4 border-gray-300 accent-pink-500"
                                    value={price.array}
                                    onChange={e => setRadio(e.target.value)}
                                />
                                <span className="ml-2 text-sm font-bold">
                                    {price.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {(radio.length !== 0 || checked.length) ? (
                <div className="text-center w-full mt-3">
                    <button onClick={() => window.location.reload()} className="p-3 m-3 rounded-md border border-transparent font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 transition-all text-sm dark:focus:ring-offset-gray-800">Clear Filters</button>
                </div>
            ) : ""}
        </div>
    )
}

export default ShopSidebar


