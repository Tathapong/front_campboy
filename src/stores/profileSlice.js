import { createSelector, createSlice } from "@reduxjs/toolkit";
import { actions as loadingActions } from "./loadingSlice";
import * as profileService from "../api/profileApi";

const profileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {
    setProfile: (state, action) => action.payload,
    addFollower: (state, action) => {
      const follow = action.payload;
      state.follower.push(follow);
    },
    deleteFollower: (state, action) => {
      const idx = action.payload;
      state.follower.splice(idx, 1);
    }
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

export const thunk_toggleFollow = (profileId) => async (dispatch, getState) => {
  try {
    const res = await profileService.toggleFollow(profileId);
    const { follow } = res.data;

    const myUserId = getState().myUser.id;
    const idx = getState().profile.follower.findIndex((item) => item.accountId === myUserId);

    if (follow) dispatch(actions.addFollower(follow));
    else dispatch(actions.deleteFollower(idx));
  } catch (error) {
    throw error;
  }
};

export const selectProfile = createSelector([(state) => state.profile, (state) => state.myUser], (profile, myUser) => {
  return {
    id: profile.id ?? "",
    firstName: profile.firstName ?? "",
    lastName: profile.lastName ?? "",
    profileImage: profile.profileImage ?? "",
    profileCoverImage: profile.coverImage ?? "",
    profileAbout: profile.about ? JSON.parse(profile.about) : "",
    follower: profile.follower ?? [],
    isFollower: profile.follower
      ? Boolean(profile.follower.filter((item) => item.accountId === myUser?.id).length)
      : false
  };
});

export const selectBlogByProfileId = createSelector(
  [(state) => state.blogs, (state, profileId) => profileId],
  (blogs, profileId) => {
    return blogs.filter((blog) => blog.userId === +profileId);
  }
);

export default profileSlice.reducer;
export const actions = profileSlice.actions;
