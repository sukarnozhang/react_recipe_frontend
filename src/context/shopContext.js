// shopContext.js

import { createContext, useState, useEffect } from "react";

// Create context object
// to make it clear the default context value is intentionally empty or invalid
export const ShopContext = createContext(null);

// Initializes the cart with all product quantities set to 0
const getDefaultCart = (products) => {
  let cart = {};
  products.forEach((product) => {
    cart[product.id] = 0;
  });
  return cart;
};

// ShopContextProvider wraps components with cart state and logic
function ShopContextProvider({ children, products }) {
  // Cart state initialized based on products (default: quantity 0)
  const [cartItems, setCartItems] = useState(getDefaultCart(products));

  // Update cartItems when products are fetched asynchronously
  useEffect(() => {
    if (products && products.length > 0) {
      setCartItems(getDefaultCart(products));
    }
  }, [products]);

  // Add one unit of the product to the cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
  };

  // Context value shared with product.js components
  const contextValue = {
    cartItems,
    addToCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
