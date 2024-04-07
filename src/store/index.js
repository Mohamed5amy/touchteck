import { configureStore } from "@reduxjs/toolkit";
import cartsReducer from "./cartsSlice";
import favReducer from "./favSlice";

const store = configureStore({ reducer : { carts : cartsReducer , fav : favReducer } })

export default store;