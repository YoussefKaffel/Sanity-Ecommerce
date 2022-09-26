import React from 'react'
import Link from "next/link";
import {AiOutlineShopping} from "react-icons/ai";
import Cart from "./Cart";

const NavBar = () => {
    return (
        <div className="navbar-container">
            <p className="logo">
                <Link href="/">
                    Sanity Store
                </Link>
            </p>
            <button type="button" className="cart-icon" onClick={()=>setShowCart(true)}>
                <AiOutlineShopping/>
                <span className="cart-item-qty">0</span>
            </button>
            <Cart />
        </div>)
}
export default NavBar
