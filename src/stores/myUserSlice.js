import { createSlice } from "@reduxjs/toolkit";
import { actions as loadingActions } from "./loadingSlice";
import * as authService from "../api/authApi";
import * as profileService from "../api/profileApi";
import { addAccesToken, removeAccesToken, addResendEmail, removeResendEmail } from "../utilities/localStorage";

const initialState = null;

const userSlice = createSlice({
  name: "myUser",
  initialState,
  reducers: {
    setMyUser: (state, action) => action.payload,
    updateMyUser: (state, action) => {
      const profile = action.payload;
      state.firstName = profile.firstName;
      state.lastName = profile.lastName;
      state.about = profile.about;
      state.profileImage = profile.profileImage;
      state.coverImage = profile.coverImage;
    },
    deleteMyUser: (state, action) => initialState,
    toggleFollowing: (state, action) => {
      const profileId = action.payload;
      const idx = state.following.findIndex((item) => item === profileId);
      if (idx === -1) state.following.push(profileId);
      else state.following.splice(idx, 1);
    }
  }
});

///+                                                                                                                              +
export const thunk_getMe =
  (isGetMe = true) =>
  async (dispatch) => {
    try {
      isGetMe && dispatch(loadingActions.startLoading());
      const res = await authService.getMe();
      const { user } = res.data;

      dispatch(actions.setMyUser(user));
    } catch (error) {
      throw error;
    } finally {
      isGetMe && dispatch(loadingActions.stopLoading());
    }
  };

///+                                                                                                                              +
export const thunk_signup = (input) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    await authService.signup(input);
    addResendEmail(input.email);
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

///+                                                                                                                              +
export const thunk_login =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      if (!getState().loading) dispatch(loadingActions.startLoading());
      const res = await authService.login({ email, password });
      const { verify } = res.data;

      if (verify) {
        addAccesToken(res.data.token);
        removeResendEmail();
        await dispatch(thunk_getMe(false));
        return true;
      } else {
        addResendEmail(email);
        return false;
      }
    } catch (error) {
      throw error;
    } finally {
      if (getState().loading) dispatch(loadingActions.stopLoading());
    }
  };

///+                                                                                                                              +
export const thunk_logout = () => (dispatch) => {
  dispatch(actions.deleteMyUser());
  removeAccesToken();
};

///+                                                                                                                              +
export const thunk_changePassword =
  ({ oldPassword, newPassword, confirmPassword }) =>
  async (dispatch, getState) => {
    try {
      if (!getState().loading) dispatch(loadingActions.startLoading());
      const res = await authService.changePassword({ oldPassword, newPassword, confirmPassword });
      const { token } = res.data;

      addAccesToken(token);
    } catch (error) {
      throw error;
    } finally {
      if (getState().loading) dispatch(loadingActions.stopLoading());
    }
  };

///+                                                                                                                              +
export const thunk_sendResetPassword = (email, type) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    await authService.sendEmail({ email, type });
    addResendEmail(email);
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

///+                                                                                                                              +
export const thunk_verifyLink = (userId, hashedToken) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    await authService.verifyLink({ userId, hashedToken });
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

///+                                                                                                                              +
export const thunk_resetPassword =
  (userId, hashedToken, newPassword, confirmPassword) => async (dispatch, getState) => {
    try {
      if (!getState().loading) dispatch(loadingActions.startLoading());
      await authService.resetPassword({ userId, hashedToken, newPassword, confirmPassword });
      dispatch(thunk_logout());
    } catch (error) {
      throw error;
    } finally {
      if (getState().loading) dispatch(loadingActions.stopLoading());
    }
  };

///+                                                                                                                              +
export const thunk_updateMyUser = (formData) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await profileService.updateProfile(formData);
    const { profile } = res.data;
    dispatch(actions.updateMyUser(profile));
  } catch (error) {
    throw error;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const selectMe = (state) => state.myUser;
export default userSlice.reducer;
export const actions = userSlice.actions;
