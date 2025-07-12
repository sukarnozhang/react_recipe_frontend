// productSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetchProducts
const fetchProducts = createAsyncThunk("products_fetch", async () => {
  const response = await axios.get("https://651b9a0a194f77f2a5ae9b01.mockapi.io/products");
  // console.log("fetch products response:", response);
  return response.data;
});

// Async thunk for fetching recipes
const fetchRecipes = createAsyncThunk(
  "products_fetchRecipes",
  async (searchItem) => {
    const appId = process.env.REACT_APP_RECEIPE_APP_ID;
    const appKey = process.env.REACT_APP_RECEIPE_APP_KEY;

    const endpoint = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchItem}&app_id=${appId}&app_key=${appKey}`;

    const response = await axios.get(endpoint);
    const recipes = response.data.hits.map((hit) => hit.recipe);
    console.log("recipes:", recipes)
    return recipes;
  }
);




// case-insensitive item search
const matchesSearch = (itemName, searchValue) =>
  itemName.toLowerCase().includes(searchValue.toLowerCase());

// check if expiry is within X months
const isExpiringWithin = (expiryDateStr, months) => {
  const now = new Date();
  const expiryDate = new Date(expiryDateStr);
  const futureDate = new Date();
  futureDate.setMonth(now.getMonth() + months);

  return expiryDate >= now && expiryDate <= futureDate;
};

const initialState = {
  products: [],
  recipes: [],
  filteredItems: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    handleSearchItem: (state, action) => {
      const searchValue = action.payload.trim();
      state.filteredItems =
        searchValue === ""
          ? state.products
          : state.products.filter((item) =>
              matchesSearch(item.item, searchValue)
            );
    },

    filterByCategory: (state, action) => {
      const category = action.payload;
      state.filteredItems =
        category === "All"
          ? state.products
          : state.products.filter(
              (item) => item.category.toLowerCase() === category.toLowerCase()
            );
    },

    filterByExpiry: (state, action) => {
      const months = action.payload;
      state.filteredItems = state.products.filter((item) =>
        isExpiringWithin(item.expiryDate, months)
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.filteredItems = action.payload;
    });
    builder.addCase(fetchRecipes.fulfilled, (state,action) => {
      state.recipes = action.payload;
    })
  },
});

export const {
  filterByCategory,
  handleSearchItem,
  filterByExpiry,
} = productSlice.actions;

export { fetchProducts, fetchRecipes };
export default productSlice.reducer;
