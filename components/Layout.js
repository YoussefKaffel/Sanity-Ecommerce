import React from 'react'
import Head from 'next/head'
import NavBar from "./NavBar";
import Footer from "./Footer";
const Layout = ({children}) => {
    return (
        <div className="layout">
            <head>
                <title>Next Ecommerce</title>

            </head>
            <header>
                <NavBar />
            </header>
            <div className='main-container'>
                {children}
            </div>
            <footer>
                <Footer/>
            </footer>
        </div>)
}
export default Layout