import { createSlice } from "@reduxjs/toolkit";
import { actions as loadingActions } from "./loadingSlice";
import * as blogService from "../api/blogApi";

const blogSlice = createSlice({
  name: "blog",
  initialState: {},
  reducers: {
    setBlog: (state, action) => action.payload
  }
});

export const thunk_getBlogById = (blogId) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await blogService.getBlogById(blogId);
    const { blog } = res.data;
    console.log(blog);
    dispatch(actions.setBlog(blog));
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const selectBlog = (state) => state.blog;

export default blogSlice.reducer;
export const actions = blogSlice.actions;
