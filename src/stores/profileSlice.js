import { createSelector, createSlice } from "@reduxjs/toolkit";
import { actions as loadingActions } from "./loadingSlice";
import * as profileService from "../api/profileApi";

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
    const res = await profileService.getProfileById(profileId);
    const { profile } = res.data;
    dispatch(actions.setProfile(profile));
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const selectProfile = (state) => {
  const profile = state.profile;
  return {
    profileName: profile.firstName ? `${profile?.firstName} ${profile?.lastName}` : "Name",
    profileImage: profile?.profileImage,
    profileCoverImage: profile?.coverImage,
    profileAbout: profile?.about
  };
};

export const selectBlogByProfileId = createSelector(
  [(state) => state.blogs, (state, profileId) => profileId],
  (blogs, profileId) => {
    return blogs.filter((blog) => blog.userId === +profileId);
  }
);

export default profileSlice.reducer;
export const actions = profileSlice.actions;
