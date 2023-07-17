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
    const idx = getState().profile.follower.findIndex((item) => item.profileId === myUserId);

    if (follow && idx === -1) dispatch(actions.addFollower(follow));
    else if (idx !== -1) dispatch(actions.deleteFollower(idx));
  } catch (error) {
    throw error;
  }
};

export const selectProfile = createSelector([(state) => state.profile, (state) => state.myUser], (profile, myUser) => {
  return {
    id: profile.id ?? "",
    firstName: profile.firstName ?? "", //
    lastName: profile.lastName ?? "", //
    profileImage: profile.profileImage ?? "",
    coverImage: profile.coverImage ?? "", //
    about: profile.about ? JSON.parse(profile.about) : "",
    follower: profile.follower ?? [],
    following: profile.following ?? [],
    isFollower: profile.follower ? Boolean(profile.follower.find((item) => item.profileId === myUser?.id)) : false
  };
});

export const selectTopFiveFollowing = createSelector([(state) => state.profile], (profile) => {
  if (profile.following?.length) {
    return Array.from(profile.following)
      .slice(0, 5)
      .map((profile) => ({ ...profile, profileAbout: undefined }));
  } else return [];
});

export default profileSlice.reducer;
export const actions = profileSlice.actions;
