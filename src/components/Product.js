//Product.js

import styles from "../css/Shop.modules.css";

function Product(props) {
    const { id, item, price, itemIMG } = props.data;
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
            <button className="addToCart">
                Add To Cart
            </button>
        </div>
    )
}

export default Product;