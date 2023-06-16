import { createSelector, createSlice } from "@reduxjs/toolkit";
import { actions as loadingActions } from "./loadingSlice";
import * as blogService from "../api/blogApi";
import { sortBlog } from "../utilities/sortItem";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    addLike: (state, action) => {
      const { like, blogIdx } = action.payload;
      state[blogIdx].BlogLikes.push(like);
    },
    deleteLike: (state, action) => {
      const { blogIdx, blogLikeIdx } = action.payload;
      state[blogIdx].BlogLikes.splice(blogLikeIdx, 1);
    },
    addSave: (state, action) => {
      const { blogIdx, save } = action.payload;
      state[blogIdx].BlogSaves = [save];
    },
    deleteSave: (state, action) => {
      const { blogIdx } = action.payload;
      state[blogIdx].BlogSaves = [];
    }
  }
});

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

export const thunk_toggleLike = (blogId) => async (dispatch, getState) => {
  try {
    const res = await blogService.toggleLike(blogId);
    const { like } = res.data;

    const myUserId = getState().myUser.id;
    const blogIdx = getState().blogs.findIndex((item) => item.id === blogId);
    const blogLikeIdx =
      blogIdx !== -1 ? getState().blogs[blogIdx].BlogLikes.findIndex((item) => item.userId === myUserId) : -1;

    if (like && blogLikeIdx === -1) dispatch(actions.addLike({ like, blogIdx }));
    else if (!like && blogLikeIdx !== -1) dispatch(actions.deleteLike({ blogIdx, blogLikeIdx }));
  } catch (error) {
    throw error;
  }
};

export const thunk_toggleSave = (blogId) => async (dispatch, getState) => {
  try {
    const res = await blogService.toggleSave(blogId);
    const { save } = res.data;

    const blogIdx = getState().blogs.findIndex((item) => item.id === blogId);

    if (save) dispatch(actions.addSave({ blogIdx, save }));
    else dispatch(actions.deleteSave({ blogIdx }));
  } catch (error) {
    throw error;
  }
};

export const selectBlogs = createSelector([(state) => state.blogs, (state, sortItem) => sortItem], (blogs, sortItem) =>
  Array.from(blogs).sort(sortBlog(sortItem))
);

export default blogsSlice.reducer;
export const actions = blogsSlice.actions;
