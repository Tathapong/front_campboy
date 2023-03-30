import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    startLoading: (state, action) => true,
    stopLoading: (state, action) => false
  }
});
export const selectLoading = (state) => state.loading;

export default loadingSlice.reducer;
export const actions = loadingSlice.actions;
