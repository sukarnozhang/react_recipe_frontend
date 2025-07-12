// Product.js
// Displays a single product with image, name, price, and add-to-cart button

import "../css/Shop.modules.css"; 
import { useContext } from "react";
import { ShopContext } from "../context/shopContext";

function Product(props) {
  // Destructure product data passed as prop from parent (Shop.js)
  const { id, item, price, itemIMG } = props.data;

  // Get addToCart function and current cart items from ShopContext
  const { addToCart, cartItems } = useContext(ShopContext);

  // Get quantity of this item currently in the cart
  const cartItemCount = cartItems[id];

  return (
    <div className="product">
      {/* Product image */}
      <img src={itemIMG} alt={item} />

      {/* Product details: name and formatted price */}
      <div>
        <p><b>{item}</b></p>
        <p>${parseFloat(price).toFixed(2)}</p>
      </div>

      {/* Add to Cart button: shows count if already added */}
      <button className="addToCart" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && `(${cartItemCount})`}
      </button>
    </div>
  );
}

export default Product;
