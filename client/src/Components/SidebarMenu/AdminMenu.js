import React from 'react'
import { RxDashboard } from 'react-icons/rx';
import { BiCategoryAlt } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi'
import { MdOutlineProductionQuantityLimits, MdLogout } from 'react-icons/md';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/auth';
import { toast } from 'react-toastify';

const AdminMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useAuth();
    const handleLogout = async () => {
        await setAuth({
            ...auth,
            user: null,
            token: ""
        })
        await localStorage.removeItem("auth")
        await toast.success("Logged out Successfully");
        navigate('/login')
    }
    return (
        <>
            <div className="flex flex-col items-center w-40 h-full overflow-hidden text-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-900 rounded">
                <div className="flex items-center w-full px-3 mt-3" href="#">
                    <span className="ml-2 text-sm font-bold">Admin Dashboard</span>
                </div>
                <div className="w-full px-2">
                    <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                        <NavLink to='/dashboard/admin' className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${location.pathname === "/dashboard/admin" ? "bg-gray-700 text-gray-300" : ""}`}>
                            <RxDashboard />
                            <span className="ml-2 text-sm font-medium">Dashboard</span>
                        </NavLink>
                        <NavLink to='/dashboard/admin/create-category' className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${location.pathname === "/dashboard/admin/create-category" ? "bg-gray-700 text-gray-300" : ""}`} >
                            <BiCategoryAlt />
                            <span className="ml-2 text-sm font-medium">Categories</span>
                        </NavLink>
                        <NavLink to='/dashboard/admin/products' className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${location.pathname === "/dashboard/admin/products" ? "bg-gray-700 text-gray-300" : ""}`} >
                            <MdOutlineProductionQuantityLimits />
                            <span className="ml-2 text-sm font-medium">Products</span>
                        </NavLink>
                        <NavLink to='/dashboard/users' className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 ${location.pathname === "/dashboard/users" ? "bg-gray-700 text-gray-300" : ""}`} >
                            <FiUsers />
                            <span className="ml-2 text-sm font-medium">Users</span>
                        </NavLink>
                        <NavLink onClick={handleLogout} type="button" className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
                            <MdLogout />
                            <span className="ml-2 text-sm font-medium">Logout</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminMenu



