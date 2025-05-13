import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  limit: 10,
  page: 1,
  sortedValue: -1,
};

const categorySlice = createSlice({
  name: "all_seller",
  initialState,
  reducers: {
    handleFilter: (state, { payload }) => {
      if (payload.limit !== undefined) {
        state.limit = payload.limit;
      }
      if (payload.sortedValue !== undefined) {
        state.sortedValue = payload.sortedValue;
      }
      if (payload.page !== undefined) {
        state.page = payload.page;
      }
    },
  },
});

export const { handleFilter } = categorySlice.actions;
export default categorySlice.reducer;
