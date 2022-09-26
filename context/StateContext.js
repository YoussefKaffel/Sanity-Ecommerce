import React , { createContext,useContext,useState,useEffect} from "react";
import {toast } from "react-hot-toast";
const Context = createContext();
export const StateContext = ({children}) => {
    const [showCart,setShowCart] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [cartTotal,setCartTotal] = useState(0);
    const [totalQty,setTotalQty] = useState(0);
    const [cartQty,setCartQty] = useState(0);
    const  incQty = () => {
        setCartQty((prev) => prev + 1);
    }
    const onAdd = (product,quantity) => {
        const exist = cartItems.find((x) => x._id === product._id);
        if(exist){
        setCartTotal((prev) => prev + product.price * quantity);
        setTotalQty((prev) => prev + quantity);
        const updatedCartItems = cartItems.map((x) => x._id === product._id ? {...exist,quantity:exist.quantity + quantity} : x);
        setCartItems(updatedCartItems);
        toast.success('Item added to cart');
        }
        else{
            setCartTotal((prev) => prev + product.price * quantity);
            setTotalQty((prev) => prev + quantity);
            setCartItems([...cartItems,{...product,quantity}]);
            toast.success('Item added to cart');
        }
    }
    const decQty = () => {

        setCartQty((prev) =>{
            if(prev > 0){
                return prev - 1;
            }
            return 0;
        });
    }

    return (
        <Context.Provider value={{
            showCart,
            cartItems,
            cartTotal,
            cartQty,
            totalQty,
            incQty,
            decQty,
            onAdd,
            setShowCart,
        }}
        >
            {children}
        </Context.Provider>)
}
export const useStateContext = () => useContext(Context);