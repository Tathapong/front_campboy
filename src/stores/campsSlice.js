import { createSelector, createSlice } from "@reduxjs/toolkit";
import * as campService from "../api/campApi";
import { actions as loadingActions } from "./loadingSlice";
import { sortCamp } from "../utilities/sortItem";

const campsSlice = createSlice({
  name: "camps",
  initialState: [],
  reducers: {
    setCamps: (state, action) => action.payload
  }
});

export const thunk_getAllCamp = (query) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await campService.getAllCamp(query);
    const { camps } = res.data;
    dispatch(actions.setCamps(camps));
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const selectCamps = createSelector([(state) => state, (state, sortItem) => sortItem], (state, sortItem) => {
  return Array.from(state.camps)
    .map((item) => {
      if (!item.OverallRating.length) return { ...item, OverallRating: [{ rating: 0, count: 0 }] };
      else return item;
    })
    .sort(sortCamp(sortItem));
});

export const selectLocationList = createSelector([selectCamps], (camps) =>
  camps.map((item) => {
    return { lat: +item.locationLat, lng: +item.locationLng, name: item.name, id: item.id };
  })
);

export default campsSlice.reducer;
export const actions = campsSlice.actions;
