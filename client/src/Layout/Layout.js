import React from 'react';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useDark } from '../Context/dark';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, title, description, keywords, author }) => {
    const [dark, setDark] = useDark();
    return (
        <>
            <div
                className={` ${!dark && 'dark'
                    }`}
            >
                <div className="bg-white dark:bg-gray-900">
                    <div className="relative w-full">
                        <Helmet>
                            <meta charset="UTF-8" />
                            <meta name="description" content={description} />
                            <meta name="keywords" content={keywords} />
                            <meta name="author" content={author} />
                            <title>{title}</title>
                        </Helmet>
                        <Header />
                        <ToastContainer />
                        <main style={{ minHeight: '90vh' }}>
                            {children}
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout