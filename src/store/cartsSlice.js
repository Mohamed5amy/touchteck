import { createSlice } from "@reduxjs/toolkit";

const cartsSlice = createSlice({
  name : "carts",
  initialState : { carts : [] },
  reducers : {
    GET_CARTS : (state , action) => {
      state.carts = action.payload
    },
    DEL_CART : (state , action) => {
      state.carts = state.carts.filter(cart => cart.id !== action.payload )
    },
    ADD_CART : (state , action) => {
      state.carts = action.payload
    },
  }
})


export const { GET_CARTS , ADD_CART , DEL_CART } = cartsSlice.actions;
export default cartsSlice.reducer;