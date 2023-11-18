import { configureStore} from "@reduxjs/toolkit";
import productReducer from "../reducer/productReducer";
import cartReducer from "../reducer/cartReducer";
// import { devToolsEnhancer } from 'redux-devtools-extension';

// When the store is created
const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
    },
    // enhancers: [devToolsEnhancer()],
})
store.subscribe(() => {
    localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.cartItems));
  });

export default store;