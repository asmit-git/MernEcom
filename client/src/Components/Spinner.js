import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
const Spinner = ({ path = "login" }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 &&
            navigate(`/${path}`, {
                state: location.pathname,
            });
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);

    return (
        <>
            <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-white">Redirecting in {count} seconds</h3>
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-60 w-60 my-10" />
            </div>
        </>
    )
}

export default Spinner