//we need to get all the selected items in our cart
//we need to make it globally

import { useState, useContext, createContext, useEffect } from "react";
const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let existingCartItem = localStorage.getItem("cart");
        if (existingCartItem) setCart(JSON.parse(existingCartItem));//from local storage
    }, []);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };