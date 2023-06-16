import { createSlice } from "@reduxjs/toolkit";
import { actions as loadingActions } from "./loadingSlice";

const profileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {
    setProfile: (state, action) => action.payload
  }
});

export const thunk_getProfileById = (profileId) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export default profileSlice.reducer;
export const actions = profileSlice.actions;
