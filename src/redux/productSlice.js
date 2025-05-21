import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetch', async() => {
    const response = await axios.get('https://651b9a0a194f77f2a5ae9b01.mockapi.io/products');
    return response.data;
});

const initialState = {
    products: [],
    filteredItems: []
  };

  const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      filterByCategory: (state, action) => {
        const category = action.payload;
        if (category === "All") {
          state.filteredItems = state.products;
        } else {
          state.filteredItems = state.products.filter(
            (item) => item.category === category
          );
        }
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.filteredItems = action.payload; // Initialize filteredItems with all products
      });
    }
  });
  

export const {filterByCategory, filterByExpire } = productSlice.actions;
export default productSlice.reducer;