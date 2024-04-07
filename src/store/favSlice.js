import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name : "fav",
  initialState : { fav : [] },
  reducers : {
    GET_FAV : (state , action) => {
      state.fav = action.payload
    },
    DEL_FAV : (state , action) => {
      state.fav = state.fav.filter(fav => fav.id !== action.payload )
    },
    ADD_FAV : (state , action) => {
      state.fav = [...state.fav, action.payload]
    },
  }
})


export const { GET_FAV , ADD_FAV , DEL_FAV } = favSlice.actions;
export default favSlice.reducer;