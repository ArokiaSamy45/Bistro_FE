import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}
 const cartReducer = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemToAdd = action.payload;
            const existingItemIndex = state.cartItems.findIndex(
              (item) => item.e._id === itemToAdd.e._id
            );
      
            if (existingItemIndex === -1) {
              state.cartItems.push(itemToAdd);
            } else {
              state.cartItems[existingItemIndex].value += itemToAdd.value;
              state.cartItems[existingItemIndex].price += itemToAdd.price;
            }
      
            state.cartTotalAmount += itemToAdd.price;
            state.cartTotalQuantity += itemToAdd.value;
      
            // Update local storage
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
          },
      deleteCart: (state, action) => {
        const { index, price } = action.payload;
  
        // Update Redux store
        state.cartItems.splice(index, 1);
        state.cartTotalAmount -= price;
        state.cartTotalQuantity -= 1;
  
        // Update local storage
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      },

        clearCart: (state, action) => {
            state.cartItems = []
            state.cartTotalQuantity = action.payload;
            state.cartTotalAmount = action.payload;
        },

        setCart: (state, action) => {
            // Update cart state based on the items fetched from local storage
            state.cartItems = action.payload;
            state.cartTotalQuantity = calculateTotalQuantity(action.payload);
            state.cartTotalAmount = calculateTotalAmount(action.payload);
          },

    }

})

export const { addToCart, deleteCart, clearCart, setCart } = cartReducer.actions;
export default cartReducer.reducer;



// Helper function to calculate total quantity based on cart items
const calculateTotalQuantity = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.value, 0);
  };
  
  // Helper function to calculate total amount based on cart items
  const calculateTotalAmount = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };




// const initialState = {
//   cartItems: [],
//   cartTotalQuantity: 0,
//   cartTotalAmount: 0,
// }
// const cartReducer = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const itemToAdd = action.payload;
//       const existingItem = state.cartItems.find((item) => item.e._id === itemToAdd.e._id);

//       if (!existingItem) {
//         state.cartItems.push(itemToAdd);
//         state.cartTotalAmount += itemToAdd.price;
//         state.cartTotalQuantity += 1;
//         state.cartStatus = true; // Set it to true when an item is successfully added.
//       } else {
//         // Handle case when the item already exists in the cart
//         // For example, you can increase the quantity of the existing item
//         existingItem.value += 1;
//         existingItem.price += itemToAdd.price;
//       }
//     },