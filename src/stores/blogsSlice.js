import { createSelector, createSlice } from "@reduxjs/toolkit";
import { actions as loadingActions } from "./loadingSlice";
import * as blogService from "../api/blogApi";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload
  }
});

export const thunk_uploadBlogImage = (formData) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await blogService.uploadImage(formData);
    const { public_id } = res.data;
    return public_id;
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const thunk_createBlog =
  ({ title, html, featureImage }) =>
  async (dispatch, getState) => {
    try {
      if (!getState().loading) dispatch(loadingActions.startLoading());
      const res = await blogService.createBlog({ title, html, featureImage });
    } catch (error) {
      throw error;
    } finally {
      if (getState().loading) dispatch(loadingActions.stopLoading());
    }
  };

export const thunk_getAllBlog = () => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await blogService.getAllBlog();
    const { blogs } = res.data;
    dispatch(actions.setBlogs(blogs));
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const selectBlogs = (state) => state.blogs;

export default blogsSlice.reducer;
export const actions = blogsSlice.actions;
