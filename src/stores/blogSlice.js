import { createSelector, createSlice } from "@reduxjs/toolkit";
import { actions as loadingActions } from "./loadingSlice";

import * as blogService from "../api/blogApi";
import { sortComment } from "../utilities/sortItem";

const blogSlice = createSlice({
  name: "blog",
  initialState: {},
  reducers: {
    setBlog: (state, action) => action.payload,
    setMoreBlog: (state, action) => {
      state.moreBlog = action.payload;
    },
    updateBlog: (state, action) => {
      const blog = action.payload;
      state.title = blog.title;
      state.content = blog.content;
    },
    deleteBlog: (state, action) => ({}),
    addLike: (state, action) => {
      state.blogLikeCount += 1;
      state.isLike = 1;
    },
    deleteLike: (state, action) => {
      state.blogLikeCount -= 1;
      state.isLike = 0;
    },

    addCommentLike: (state, action) => {
      const commentIdx = action.payload;
      state.BlogComments[commentIdx].isCommentLike = 1;
      state.BlogComments[commentIdx].commentLikeCount += 1;
    },
    deleteCommentLike: (state, action) => {
      const commentIdx = action.payload;
      state.BlogComments[commentIdx].isCommentLike = 0;
      state.BlogComments[commentIdx].commentLikeCount -= 1;
    },
    addSave: (state, action) => {
      state.isSave = 1;
    },
    deleteSave: (state, action) => {
      state.isSave = 0;
    },

    addComment: (state, action) => {
      const comment = action.payload;
      state.BlogComments.unshift(comment);
      state.blogCommentCount += 1;
    },
    updateComment: (state, action) => {
      const { commentIdx, newTitle } = action.payload;
      state.BlogComments[commentIdx].contentText = newTitle;
    },
    deleteComment: (state, action) => {
      const { commentId } = action.payload;
      state.BlogComments = state.BlogComments.filter((item) => item.id !== commentId);
      state.blogCommentCount -= 1;
    }
  }
});

export const thunk_getBlogById = (blogId) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await blogService.getBlogById(blogId);
    const { blog, moreBlog } = res.data;
    dispatch(actions.setBlog(blog));
    dispatch(actions.setMoreBlog(moreBlog));
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const thunk_uploadImage = (formData) => async (dispatch, getState) => {
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
  ({ title, rawContentState, featureImage }) =>
  async (dispatch, getState) => {
    try {
      if (!getState().loading) dispatch(loadingActions.startLoading());
      await blogService.createBlog({ title, rawContentState, featureImage });
    } catch (error) {
      throw error;
    } finally {
      if (getState().loading) dispatch(loadingActions.stopLoading());
    }
  };

export const thunk_updateBlog =
  ({ title, rawContentState, featureImage, blogId }) =>
  async (dispatch, getState) => {
    try {
      if (!getState().loading) dispatch(loadingActions.startLoading());
      const res = await blogService.updateBlog({ title, rawContentState, featureImage, blogId });
      const { blog } = res.data;
      dispatch(actions.updateBlog(blog));
    } catch (error) {
      throw error;
    } finally {
      if (getState().loading) dispatch(loadingActions.stopLoading());
    }
  };

export const thunk_deleteBlog = (blogId) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    await blogService.deleteBlog(blogId);
    dispatch(actions.deleteBlog());
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const thunk_toggleSave = (blogId) => async (dispatch, getState) => {
  try {
    const res = await blogService.toggleSave(blogId);
    const { save } = res.data;

    const myUserId = getState().myUser.id;

    if (save && save.userId === myUserId) dispatch(actions.addSave());
    else dispatch(actions.deleteSave());
  } catch (error) {
    throw error;
  }
};

export const thunk_toggleLike = (blogId) => async (dispatch, getState) => {
  try {
    const res = await blogService.toggleLike(blogId);
    const { like } = res.data;

    const myUserId = getState().myUser.id;

    if (like && like.userId === myUserId) dispatch(actions.addLike());
    else dispatch(actions.deleteLike());
  } catch (error) {
    throw error;
  }
};

export const thunk_commentToggleLike = (commentId) => async (dispatch, getState) => {
  try {
    const res = await blogService.toggleCommentLike(commentId);
    const { commentLike } = res.data;

    const myUserId = getState().myUser.id;
    const commentIdx = getState().blog.BlogComments.findIndex((item) => item.id === commentId);

    if (commentLike && commentLike.userId === myUserId) dispatch(actions.addCommentLike(commentIdx));
    else dispatch(actions.deleteCommentLike(commentIdx));
  } catch (error) {
    throw error;
  }
};

export const thunk_createComment =
  ({ blogId, title }) =>
  async (dispatch, getState) => {
    try {
      if (!getState().loading) dispatch(loadingActions.startLoading());
      const res = await blogService.createComment({ blogId, title });
      const { comment } = res.data;
      dispatch(actions.addComment(comment));
    } catch (error) {
      throw error;
    } finally {
      if (getState().loading) dispatch(loadingActions.stopLoading());
    }
  };

export const thunk_updateComment =
  ({ blogId, commentId, title }) =>
  async (dispatch, getState) => {
    try {
      const res = await blogService.updateComment({ blogId, commentId, title });
      const newTitle = res.data.comment;

      const commentIdx = getState().blog.BlogComments.findIndex((item) => item.id === commentId);

      if (commentIdx !== -1) dispatch(actions.updateComment({ commentIdx, newTitle }));
    } catch (error) {
      throw error;
    }
  };

export const thunk_deleteComment =
  ({ blogId, commentId }) =>
  async (dispatch, getState) => {
    try {
      if (!getState().loading) dispatch(loadingActions.startLoading());
      await blogService.deleteComment({ blogId, commentId });
      dispatch(actions.deleteComment({ commentId }));
    } catch (error) {
      throw error;
    } finally {
      if (getState().loading) dispatch(loadingActions.stopLoading());
    }
  };

export const selectBlog = (state) => state.blog;

export const selectComments = createSelector([(state) => state.blog, (state, sortItem) => sortItem], (blog, sortItem) =>
  blog.BlogComments ? Array.from(blog.BlogComments).sort(sortComment(sortItem)) : []
);

export default blogSlice.reducer;
export const actions = blogSlice.actions;
