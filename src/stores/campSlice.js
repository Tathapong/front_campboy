import { createSelector, createSlice } from "@reduxjs/toolkit";
import * as campService from "../api/campApi";
import { actions as loadingActions } from "./loadingSlice";

const campSlice = createSlice({
  name: "camp",
  initialState: {},
  reducers: {
    setCamp: (state, action) => action.payload
  }
});

export const thunk_getCampById = (campId) => async (dispatch, getState) => {
  try {
    dispatch(loadingActions.startLoading());
    const res = await campService.getCampById(campId);
    const { camp } = res.data;
    dispatch(actions.setCamp(camp));
  } catch (err) {
    throw err.response.data;
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const selectCamp = (state) => state.camp;

export default campSlice.reducer;
export const actions = campSlice.actions;
