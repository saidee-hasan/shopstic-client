import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    
    currentSize: 0,
    previousSize: 0,
    showSize: 0,
    isClicked: false,
  },
};

const qnaSlice = createSlice({
  name: "qna",
  initialState,
  reducers: {
    handleQnASize: (state, { payload }) => {
      state.value.currentSize = payload;
      if (state.value.currentSize > state.value.previousSize) {
        state.value.showSize = Math.abs(state.value.previousSize - payload);
        state.value.previousSize = payload;
        state.value.isClicked = false;
      }
    },
    handleIsClicked: (state) => {
      state.value.isClicked = true;
      state.value.showSize = 0;
    },
  },
});

export const {handleQnASize, handleIsClicked } =
  qnaSlice.actions;

export default qnaSlice.reducer;
