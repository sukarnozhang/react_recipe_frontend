import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await axios.get(
    "https://651b9a0a194f77f2a5ae9b01.mockapi.io/products"
  );
  return response.data;
});

const initialState = {
  products: [],
  filteredItems: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    handleSearchItem: (state, action) => {
      const searchValue = action.payload.toLowerCase();
      if (searchValue === "") {
        state.filteredItems = state.products;
      } else {
        state.filteredItems = state.products.filter(
          (item) => item.item.toLowerCase() === searchValue
        );
      }
    },

    filterByCategory: (state, action) => {
      const category = action.payload;
      if (category === "All") {
        state.filteredItems = state.products;
      } else {
        state.filteredItems = state.products.filter(
          (item) => item.category === category
        );
      }
    },

    filterByExpiry: (state, action) => {
      const now = new Date("2024-07-07T16:23:55.906Z"); // current date
      const expiryIn = action.payload; // e.g. 1 for 1 month
    
      const futureDate = new Date(now); // clone current date
      futureDate.setMonth(now.getMonth() + expiryIn);
    
      state.filteredItems = state.products.filter((item) => {
        const expiryDate = new Date(item.expiryDate); // parse string to Date
        return expiryDate >= now && expiryDate <= futureDate;
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.filteredItems = action.payload; // Initialize filteredItems with all products
    });
  },
});

export const { filterByCategory, handleSearchItem, filterByExpiry } = productSlice.actions;
export default productSlice.reducer;
