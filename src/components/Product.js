//Product.js

import "../css/Shop.modules.css";
import { ShopContext } from "../context/shopContext";
import { useContext } from "react";

function Product(props) {
    const { id, item, price, itemIMG } = props.data;
    const { addToCart, cartItems } = useContext(ShopContext);
    const cartItemCount = cartItems[id];

    return (
        <div className="product">
            <img src={itemIMG} />
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