import {  createSlice } from "@reduxjs/toolkit";


export const productReducer = createSlice({
  name: "products",
  initialState: {
    products: []
  },
  reducers: {
    allProducts : (state, action) => {
      state.products = action.payload; 
    },

    filterItems: (state, action)=>{
      state.products = []
      state.products = action.payload;
    }
  },


});


export const { allProducts , filterItems} = productReducer.actions;
export default productReducer.reducer;





