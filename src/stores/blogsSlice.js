import { createSelector, createSlice } from "@reduxjs/toolkit";
import { actions as loadingActions } from "./loadingSlice";
import * as blogService from "../api/blogApi";
import { sortBlog } from "../utilities/sortItem";
import { RECENTS, TOP_PICK, FOLLOWING, SAVE } from "../constants/constant";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    addLike: (state, action) => {
      const blogIdx = action.payload;
      state[blogIdx].isLike = 1;
      state[blogIdx].blogLikeCount += 1;
    },
    deleteLike: (state, action) => {
      const blogIdx = action.payload;
      state[blogIdx].isLike = 0;
      state[blogIdx].blogLikeCount -= 1;
    },
    addSave: (state, action) => {
      const blogIdx = action.payload;
      state[blogIdx].isSave = 1;
    },
    deleteSave: (state, action) => {
      const blogIdx = action.payload;
      state[blogIdx].isSave = 0;
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

    if (like && like.userId === myUserId) dispatch(actions.addLike(blogIdx));
    else dispatch(actions.deleteLike(blogIdx));
  } catch (error) {
    throw error;
  }
};

export const thunk_toggleSave = (blogId) => async (dispatch, getState) => {
  try {
    const res = await blogService.toggleSave(blogId);
    const { save } = res.data;

    const myUserId = getState().myUser.id;
    const blogIdx = getState().blogs.findIndex((item) => item.id === blogId);

    if (save && save.userId === myUserId) dispatch(actions.addSave(blogIdx));
    else dispatch(actions.deleteSave(blogIdx));
  } catch (error) {
    throw error;
  }
};

export const selectBlogs = createSelector(
  [(state) => state.blogs, (state, sortItem) => sortItem, (state) => state.myUser],
  (blogs, sortItem, myUser) => {
    let selectedBlogs = Array.from(blogs);
    if (sortItem === RECENTS || sortItem === TOP_PICK) selectedBlogs = selectedBlogs.sort(sortBlog(sortItem));
    else if (sortItem === FOLLOWING)
      selectedBlogs = selectedBlogs
        .filter((blog) => myUser.following.includes(blog.profileId))
        .sort(sortBlog(sortItem));
    else if (sortItem === SAVE) selectedBlogs = selectedBlogs.filter((blog) => blog.isSave).sort(sortBlog(sortItem));

    return selectedBlogs;
  }
);

export const selectBlogsByProfileId = createSelector(
  [(state) => state.blogs, (state, profileId) => profileId],
  (blogs, profileId) => {
    return blogs.filter((blog) => blog.profileId === +profileId);
  }
);

export default blogsSlice.reducer;
export const actions = blogsSlice.actions;
