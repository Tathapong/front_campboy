import { createSelector, createSlice } from "@reduxjs/toolkit";
import { actions as loadingActions } from "./loadingSlice";
import * as homeService from "../api/homeApi";

const homeSlice = createSlice({
  name: "home",
  initialState: {},
  reducers: {
    setRandomCamp: (state, action) => ({ ...state, randomCamp: action.payload }),
    deleteRandomCamp: (state, action) => ({ ...state, randomCamp: undefined }),
    setTopCamps: (state, action) => ({ ...state, topCamps: action.payload }),
    setMorePosts: (state, action) => ({
      ...state,
      topBlogs: action.payload.topBlogs,
      recentBlogs: action.payload.recentBlogs
    }),
    setRecentReviews: (state, action) => ({ ...state, recentReview: action.payload })
  }
});

export const thunk_getRandomCamp = () => async (dispatch, getState) => {
  try {
    const res = await homeService.getRandomCamp();
    const { camp } = res.data;
    dispatch(actions.setRandomCamp(camp));
  } catch (error) {
    throw error;
  }
};

export const thunk_getTopCamps = () => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await homeService.getTopCamp();
    const { camps } = res.data;
    dispatch(actions.setTopCamps(camps));
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const thunk_getMorePosts = () => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await homeService.getMorePost();
    const { topBlogs, recentBlogs } = res.data;
    dispatch(actions.setMorePosts({ topBlogs, recentBlogs }));
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const thunk_getRecentReviews = () => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await homeService.getRecentReview();
    const { reviews } = res.data;
    dispatch(actions.setRecentReviews(reviews));
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const selectRandomCamp = (state) => state.home.randomCamp;
export const selectTopCamps = (state) => state.home.topCamps ?? [];
export const selectMorePost = createSelector([(state) => state.home], (home) => ({
  topBlogs: home.topBlogs ?? [],
  recentBlogs: home.recentBlogs ?? []
}));
export const selectRecentReview = (state) => state.home.recentReview ?? [];

export default homeSlice.reducer;
export const actions = homeSlice.actions;
