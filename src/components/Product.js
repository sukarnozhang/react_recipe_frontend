//Product.js
// for each icon like applem, cranberry
import "../css/Shop.modules.css";
import { ShopContext } from "../context/shopContext";
import { useContext } from "react";

// the prop is from Shop.js with item and id
function Product(props) {
    const { id, item, price, itemIMG } = props.data;
    const { addToCart, cartItems } = useContext(ShopContext);
    const cartItemCount = cartItems[id];

    return (
        <div className="product">
            <img src={itemIMG} alt="products" />
            <div>
                <p>
                    <b>{item}</b>
                </p>
                <p>
                    ${parseFloat(price).toFixed(2)}
                </p>
            </div>
            <button className="addToCart" onClick={() => addToCart(id)}>
                Add To Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </button>
        </div>
    )
}

export default Product;