// Shop.js

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Component imports
import Logo from "../logo";
import SearchItem from "./SearchItem";
import Button from "./Button";
import Product from "./Product";

// Context Provider (used as wrapper in return section, pass a list of products to context)
import ShopContextProvider from "../context/shopContext";

// Redux actions
import {
  fetchProducts,
  fetchRecipes,
  filterByCategory,
  handleSearchItem,
  filterByExpiry,
} from "../redux/productSlice";

// Styles
import "../css/Shop.modules.css";

function Shop() {
  // send actions to Redux store
  const dispatch = useDispatch();

  // Accessing state from Redux store
  // product : all the products
  // filteredItems : items remainings after filtration
  const { products, recipes, filteredItems } = useSelector(
    (state) => state.products
  );

  // Fetch all products on component mount, using redux action
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <ShopContextProvider products={products}>
      <div>
        {/* Lemon logo */}
        <Logo />

        {/* Search bar for finding products and fetching recipes */}
        <SearchItem
          onChange={(e) => {
            dispatch(handleSearchItem(e));
            if (e !== "") {
              dispatch(fetchRecipes(e));
            }
          }}
        />

        {/* Filter buttons by expiry duration */}
        <div className="expiryAndCategory">
          <Button
            label="Expire in 1 Month"
            onClick={() => dispatch(filterByExpiry(1))}
          />
          <Button
            label="Expire in 2 Months"
            onClick={() => dispatch(filterByExpiry(2))}
          />
          <Button
            label="Expire in 3 Months"
            onClick={() => dispatch(filterByExpiry(3))}
          />
        </div>

        {/* Filter buttons by category */}
        <div className="expiryAndCategory">
          <Button
            label="All Items"
            onClick={() => dispatch(filterByCategory("All"))}
          />
          <Button
            label="Fruit"
            onClick={() => dispatch(filterByCategory("fruit"))}
          />
          <Button
            label="Meat"
            onClick={() => dispatch(filterByCategory("meat"))}
          />
          <Button
            label="Vegetable"
            onClick={() => dispatch(filterByCategory("vegetable"))}
          />
          <Button
            label="Others"
            onClick={() => dispatch(filterByCategory("others"))}
          />
        </div>

        {/* Display filtered products */}
        <div className="products">
          {filteredItems.map((item) => (
            <Product data={item} key={item.id} />
          ))}
        </div>

        {/* Display recipe results if available */}
        <h2 className="section-title">Available Recipes</h2>
        <ul className="recipes">
          {recipes.map((recipe, index) => (
            <li key={index} className="recipe-item">
              <h3>{recipe.label}</h3>
              <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                <img src={recipe.images.REGULAR.url} alt={recipe.label} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </ShopContextProvider>
  );
}

export default Shop;
