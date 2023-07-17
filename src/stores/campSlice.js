import { createSelector, createSlice } from "@reduxjs/toolkit";
import * as campService from "../api/campApi";
import { actions as loadingActions } from "./loadingSlice";
import { sortReview } from "../utilities/sortItem";

const campSlice = createSlice({
  name: "camp",
  initialState: {},
  reducers: {
    setCamp: (state, action) => action.payload,
    addReview: (state, action) => {
      const reviewPost = action.payload;
      state.ReviewPosts.unshift(reviewPost);
      state.scores = state.ReviewPosts;
    },
    updateReview: (state, action) => {
      const { idx, reviewPost } = action.payload;
      state.ReviewPosts[idx].summarize = reviewPost.summarize;
      state.ReviewPosts[idx].reviewText = reviewPost.reviewText;
      state.ReviewPosts[idx].rating = "" + reviewPost.rating;
    },
    deleteReview: (state, action) => {
      const idx = action.payload;
      state.ReviewPosts.splice(idx, 1);
    },
    updateScores: (state, action) => {
      state.scores = Math.round(
        state.ReviewPosts.map((review) => +review.rating).reduce((sum, item, index, arr) => sum + item / arr.length, 0)
      );
    }
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
    const res = await campService.writeReview(input);
    const { reviewPost } = res.data;
    dispatch(actions.addReview(reviewPost));
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) {
      dispatch(loadingActions.stopLoading());
      dispatch(actions.updateScores());
    }
  }
};

export const thunk_updateReview = (input) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await campService.updateReview(input);
    const { reviewPost } = res.data;

    const idx = getState().camp.ReviewPosts.findIndex((item) => item.id === reviewPost.id);

    if (idx !== -1) {
      dispatch(actions.updateReview({ idx, reviewPost }));
      dispatch(actions.updateScores());
    }
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};
export const thunk_deleteReview = (reviewId) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    await campService.deleteReview(reviewId);

    const idx = getState().camp.ReviewPosts.findIndex((item) => item.id === reviewId);

    if (idx !== -1) {
      dispatch(actions.deleteReview(idx));
      dispatch(actions.updateScores());
    }
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const selectCamp = createSelector([(state) => state.camp], (camp) => camp);
export const selectCampImages = createSelector([(state) => state.camp], (camp) => camp.CampImages ?? []);

export const selectLocation = createSelector([(state) => state.camp], (camp) => ({
  lat: camp.locationLat ? +camp.locationLat : 0,
  lng: camp.locationLng ? +camp.locationLng : 0,
  name: camp.name,
  id: camp.id
}));

export const selectContact = (state) => state.camp.CampContacts ?? [];
export const selectReviewList = createSelector([selectCamp, (state, sortItem) => sortItem], (camp, sortItem) =>
  camp.ReviewPosts ? Array.from(camp.ReviewPosts).sort(sortReview(sortItem)) : []
);

export const selectInformation = createSelector(
  [(state) => state.camp, (state, sortItem) => sortItem],
  (camp, sortItem) => (camp.CampInformations ? camp.CampInformations.filter((item) => item.type === sortItem) : [])
);

export default campSlice.reducer;
export const actions = campSlice.actions;
