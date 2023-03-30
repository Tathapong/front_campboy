import { createSelector, createSlice } from "@reduxjs/toolkit";
import * as campService from "../api/campApi";
import { actions as loadingActions } from "./loadingSlice";

const campsSlice = createSlice({
  name: "camps",
  initialState: [],
  reducers: {
    setCamps: (state, action) => action.payload
  }
});

export const thunk_getAllCamp = (query) => async (dispatch, getState) => {
  try {
    dispatch(loadingActions.startLoading());
    const res = await campService.getAllCamp(query);
    const { camps } = res.data;
    dispatch(actions.setCamps(camps));
  } catch (error) {
    throw error.response.data;
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const selectCamps = (state) => state.camps;
export const selectLocationList = createSelector([selectCamps], (camps) =>
  camps.map((item) => {
    return { lat: +item.locationLat, lng: +item.locationLng, name: item.name, id: item.id };
  })
);

export default campsSlice.reducer;
export const actions = campsSlice.actions;
