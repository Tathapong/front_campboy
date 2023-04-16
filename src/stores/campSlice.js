import { createSelector, createSlice } from "@reduxjs/toolkit";
import * as campService from "../api/campApi";
import { actions as loadingActions } from "./loadingSlice";
import { sortReview } from "../utilities/sortItem";

const campSlice = createSlice({
  name: "camp",
  initialState: {},
  reducers: {
    setCamp: (state, action) => action.payload
  }
});

export const thunk_getCampById = (campId) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await campService.getCampById(campId);
    const { camp } = res.data;
    dispatch(actions.setCamp(camp));
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const thunk_writeReview = (input) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    await campService.writeReview(input);
    dispatch(thunk_getCampById(input.campId));
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const selectCamp = (state) => state.camp;
export const selectCampImage = (state) =>
  state.camp.CampImages ? state.camp.CampImages.map((item) => item.image) : [];
export const selectProvince = (state) =>
  state.camp.Province
    ? state.camp.Province.name[0].toUpperCase() + state.camp.Province.name.slice(1).toLowerCase()
    : "";
export const selectCampName = (state) => state.camp.name ?? "";
export const selectOverview = (state) => state.camp.overview ?? "";
export const selectLocation = (state) => ({
  lat: state.camp.locationLat ? +state.camp.locationLat : 0,
  lng: state.camp.locationLng ? +state.camp.locationLng : 0,
  name: state.camp.name,
  id: state.camp.id
});
export const selectContact = (state) => state.camp.CampContacts ?? [];
export const selectReviewList = createSelector([selectCamp, (state, sortItem) => sortItem], (camp, sortItem) =>
  camp.ReviewPosts ? Array.from(camp.ReviewPosts).sort(sortReview(sortItem)) : []
);

export default campSlice.reducer;
export const actions = campSlice.actions;
