import { createSelector, createSlice } from "@reduxjs/toolkit";
import { actions as loadingActions } from "./loadingSlice";
import * as blogService from "../api/blogApi";
import { sortComment } from "../utilities/sortItem";

const blogSlice = createSlice({
  name: "blog",
  initialState: {},
  reducers: {
    setBlog: (state, action) => action.payload,
    updateBlog: (state, action) => {
      const blog = action.payload;
      state.title = blog.title;
      state.content = blog.content;
    },
    deleteBlog: (state, action) => ({}),
    addLike: (state, action) => {
      state.BlogLikes?.push(action.payload);
    },
    deleteLike: (state, action) => {
      const { idx } = action.payload;
      state.BlogLikes.splice(idx, 1);
    },

    addCommentLike: (state, action) => {
      const { comment_idx, commentLike } = action.payload;
      state.BlogComments[comment_idx].CommentLikes.push(commentLike);
    },
    deleteCommentLike: (state, action) => {
      const { comment_idx, idx } = action.payload;
      state.BlogComments[comment_idx].CommentLikes.splice(idx, 1);
    },
    addSave: (state, action) => {
      state.BlogSaves = [action.payload];
    },
    deleteSave: (state, action) => {
      state.BlogSaves = [];
    },

    addComment: (state, action) => {
      const comment = action.payload;
      state.BlogComments.unshift(comment);
    },
    deleteComment: (state, action) => {
      const { commentId } = action.payload;
      state.BlogComments = state.BlogComments.filter((item) => item.id !== commentId);
    },
    updateComment: (state, action) => {
      const { idx, newTitle } = action.payload;
      state.BlogComments[idx].contentText = newTitle;
    }
  }
});

export const thunk_getBlogById = (blogId) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await blogService.getBlogById(blogId);
    const { blog } = res.data;
    dispatch(actions.setBlog(blog));
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

    if (save) dispatch(actions.addSave(save));
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
    const idx = getState().blog.BlogLikes.findIndex((item) => item.userId === myUserId);

    if (like && idx === -1) dispatch(actions.addLike(like));
    else if (!like && idx !== -1) dispatch(actions.deleteLike({ idx }));
  } catch (error) {
    throw error;
  }
};

export const thunk_commentToggleLike = (commentId) => async (dispatch, getState) => {
  try {
    const res = await blogService.toggleCommentLike(commentId);
    const { commentLike } = res.data;

    const myUserId = getState().myUser.id;
    const comment_idx = getState().blog.BlogComments.findIndex((item) => item.id === commentId);

    const idx =
      comment_idx !== -1
        ? getState().blog.BlogComments[comment_idx].CommentLikes.findIndex((item) => item.userId === myUserId)
        : -1;

    if (commentLike && idx === -1) dispatch(actions.addCommentLike({ comment_idx, commentLike }));
    else if (!commentLike && idx !== -1) dispatch(actions.deleteCommentLike({ idx, comment_idx }));
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

export const thunk_updateComment =
  ({ blogId, commentId, title }) =>
  async (dispatch, getState) => {
    try {
      const res = await blogService.updateComment({ blogId, commentId, title });
      const newTitle = res.data.comment;
      const idx = getState().blog.BlogComments.findIndex((item) => item.id === commentId);
      if (idx !== -1) dispatch(actions.updateComment({ idx, newTitle }));
    } catch (error) {
      throw error;
    }
  };

export const selectBlog = (state) => ({
  profileId: state.blog ? state.blog.userId : null,
  profileName: state.blog.User ? `${state.blog.User.firstName} ${state.blog.User.lastName}` : "Name",
  profileAbout: state.blog.User?.about ? state.blog.User.about : undefined,
  profileImage: state.blog.User ? state.blog.User.profileImage : undefined,
  blogDate: state.blog.createdAt
    ? new Date(state.blog.createdAt).toDateString().slice(4)
    : new Date().toDateString().slice(4),
  blogTitle: state.blog.title ?? "Blog Title",
  blogRawContent: state.blog.content ? JSON.parse(state.blog.content) : undefined,
  blogLikeCount: state.blog.BlogLikes ? state.blog.BlogLikes.length : 0,
  commentCount: state.blog.BlogComments ? state.blog.BlogComments.length : 0,
  isSave: state.blog.BlogSaves ? state.blog.BlogSaves[0]?.userId === state.myUser?.id : false,
  isLike: state.blog.BlogLikes ? state.blog.BlogLikes.filter((item) => item.userId === state.myUser?.id).length : false
});
export const selectComments = createSelector([(state) => state.blog, (state, sortItem) => sortItem], (blog, sortItem) =>
  blog.BlogComments ? Array.from(blog.BlogComments).sort(sortComment(sortItem)) : []
);

export default blogSlice.reducer;
export const actions = blogSlice.actions;
