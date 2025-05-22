// shopContext.js

import { createContext, useState, useEffect } from "react";
export const ShopContext = createContext(null);

// to set for item to quantity of 0 at first
const getDefaultCart = (products) => {
    let cart = {};
    products.forEach((product) => {
        cart[product.id] = 0;
    })
    return cart;
  };

function ShopContextProvider({children, products}) {
    const [cartItems, setCartItems] = useState(getDefaultCart(products));

    // an empty array (because it's being fetched asynchronously via Redux in Shop.js)
    useEffect(() => {
        if (products && products.length > 0) {
          setCartItems(getDefaultCart(products));
        }
      }, [products]);

    const addToCart = (itemId) => {
        setCartItems( (prev) => ({...prev, [itemId]: prev[itemId] + 1 }));
    };

    const contextValue = {
        cartItems,
        addToCart
    }

    return (
      <ShopContext.Provider value={contextValue}>
        {children}
      </ShopContext.Provider>
    );
}

export default ShopContextProvider;