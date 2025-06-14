import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedAddress: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    add_address: (state, { payload }) => {
      state.selectedAddress = payload;
    },
  },
});

export const { add_address } = addressSlice.actions;
export default addressSlice.reducer;
