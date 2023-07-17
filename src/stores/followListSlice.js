import { createSelector, createSlice } from "@reduxjs/toolkit";
import { actions as loadingActions } from "./loadingSlice";
import * as profileService from "../api/profileApi";

const followListSlice = createSlice({
  name: "followList",
  initialState: {},
  reducers: {
    setTopWriter: (state, actions) => ({ ...state, topWriter: actions.payload })
  }
});

export const thunk_getTopWriter = () => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await profileService.getAccountListTopWriter();
    const { followList } = res.data;
    dispatch(actions.setTopWriter(followList));
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const selectTopWriter = createSelector(
  [(state) => state.followList],
  (followList) => followList.topWriter ?? []
);
export const selectTopFiveWriter = createSelector([(state) => state.followList], (followList) =>
  followList.topWriter
    ? followList.topWriter?.slice(0, 5).map((profile) => ({ ...profile, profileAbout: undefined }))
    : []
);

export default followListSlice.reducer;
export const actions = followListSlice.actions;
