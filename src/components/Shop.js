// Shop.js

import { useEffect } from "react";
import Logo from "../logo";
import "../css/Shop.modules.css";
import SearchItem from "./SearchItem";
import Button from "./Button";
import Product from "./Product";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  filterByCategory,
  handleSearchItem,
  filterByExpiry
} from "../redux/productSlice";


function Shop() {

  const dispatch = useDispatch();

  const { filteredItems } = useSelector((state) => state.products);

  // Use effect to get all products for every render
  useEffect(() => {
    console.log("Effect running");
    dispatch(fetchProducts());
  }, [dispatch]);


  return (
    <div>
      <Logo />
      <SearchItem onChange={(e) => dispatch(handleSearchItem(e))} />

      <div className="expiryAndCategory">
        <Button label="Expire in 1 Month" onClick={() => dispatch(filterByExpiry(1))} />
        <Button label="Expire in 2 Months" onClick={() => dispatch(filterByExpiry(2))} />
        <Button label="Expire in 3 Months" onClick={() => dispatch(filterByExpiry(3))} />
      </div>

      <div className="expiryAndCategory">
        <Button label="All Items" onClick={() => dispatch(filterByCategory("All"))} />
        <Button label="Fruit" onClick={() => dispatch(filterByCategory("fruit"))} />
        <Button label="Meat" onClick={() => dispatch(filterByCategory("meat"))} />
        <Button label="Vegetable" onClick={() => dispatch(filterByCategory("vegetable"))} />
        <Button label="Others" onClick={() => dispatch(filterByCategory("others"))} />
      </div>

      <div className="products">
        {
          filteredItems.map((item) => (
            <Product data={item} key={item.id} />
            
          ))
        }
      </div>
    </div>
  );
}

export default Shop;
