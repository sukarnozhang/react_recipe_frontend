// productSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk: Fetch products from mock API
const fetchProducts = createAsyncThunk("products_fetch", async () => {
  const response = await axios.get("https://651b9a0a194f77f2a5ae9b01.mockapi.io/products");
  return response.data;
});

// Async thunk: Fetch recipes from Edamam API based on search item
const fetchRecipes = createAsyncThunk("products_fetchRecipes", async (searchItem) => {
  const appId = process.env.REACT_APP_RECEIPE_APP_ID;
  const appKey = process.env.REACT_APP_RECEIPE_APP_KEY;

  const endpoint = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchItem}&app_id=${appId}&app_key=${appKey}`;

  const response = await axios.get(endpoint);
  const recipes = response.data.hits.map((hit) => hit.recipe);

  console.log("recipes:", recipes);
  return recipes;
});

// Case-insensitive string match for item names
const matchesSearch = (itemName, searchValue) =>
  itemName.toLowerCase().includes(searchValue.toLowerCase());

// Check if expiry date is within X months from now
const isExpiringWithin = (expiryDateStr, months) => {
  const now = new Date();
  const expiryDate = new Date(expiryDateStr);
  const futureDate = new Date();
  futureDate.setMonth(now.getMonth() + months);

  return expiryDate >= now && expiryDate <= futureDate;
};

// Initial state for product slice
const initialState = {
  products: [],       // All fetched products
  recipes: [],        // All fetched recipes
  filteredItems: [],  // Filtered list based on user input or selection
};

// Redux slice definition
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Filter by search text
    handleSearchItem: (state, action) => {
      const searchValue = action.payload.trim();
      state.filteredItems =
        searchValue === ""
          ? state.products
          : state.products.filter((item) =>
              matchesSearch(item.item, searchValue)
            );
    },

    // Filter by category (e.g., fruit, dairy, etc.)
    filterByCategory: (state, action) => {
      const category = action.payload;
      state.filteredItems =
        category === "All"
          ? state.products
          : state.products.filter(
              (item) => item.category.toLowerCase() === category.toLowerCase()
            );
    },

    // Filter items by expiry date within X months
    filterByExpiry: (state, action) => {
      const months = action.payload;
      state.filteredItems = state.products.filter((item) =>
        isExpiringWithin(item.expiryDate, months)
      );
    },
  },

  // Handle results from async thunks
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.filteredItems = action.payload; // Initial display = all products
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload;
      });
  },
});

// Export actions
export const {
  filterByCategory,
  handleSearchItem,
  filterByExpiry,
} = productSlice.actions;

// Export async thunks
export { fetchProducts, fetchRecipes };

// Export reducer to be used in store
export default productSlice.reducer;
