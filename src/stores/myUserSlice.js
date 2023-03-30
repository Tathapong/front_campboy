import { createSlice } from "@reduxjs/toolkit";
import { actions as loadingActions } from "./loadingSlice";
import * as authService from "../api/authApi";
import { addAccesToken, removeAccesToken } from "../utilities/localStorage";

const initialState = null;

const userSlice = createSlice({
  name: "myUser",
  initialState,
  reducers: {
    setMyUser: (state, action) => action.payload,
    deleteMyUser: (state, action) => initialState
  }
});

export const thunk_getMe =
  (isGetMe = true) =>
  async (dispatch) => {
    try {
      isGetMe && dispatch(loadingActions.startLoading());
      const res = await authService.getMe();
      const { user } = res.data;
      if (isGetMe) dispatch(actions.setMyUser(user));
      else setTimeout(() => dispatch(actions.setMyUser(user)), 1);
    } catch (error) {
      if (isGetMe) throw error.response.data;
      else throw error;
    } finally {
      isGetMe && dispatch(loadingActions.stopLoading());
    }
  };

export const thunk_signup = (input) => async (dispatch, getState) => {
  try {
    if (!getState().loading) dispatch(loadingActions.startLoading());
    const res = await authService.signup(input);
    const { token } = res.data;
    addAccesToken(token);
    await dispatch(thunk_getMe(false));
  } catch (error) {
    throw error.response.data;
  } finally {
    if (getState().loading) dispatch(loadingActions.stopLoading());
  }
};

export const thunk_login =
  ({ emailOrMobile, password }) =>
  async (dispatch, getState) => {
    try {
      if (!getState().loading) dispatch(loadingActions.startLoading());
      const res = await authService.login({ emailOrMobile, password });
      addAccesToken(res.data.token);
      await dispatch(thunk_getMe(false));
    } catch (error) {
      throw error.response.data;
    } finally {
      if (getState().loading) dispatch(loadingActions.stopLoading());
    }
  };
export const thunk_logout = () => (dispatch) => {
  dispatch(actions.deleteMyUser());
  removeAccesToken();
};
export const thunk_changePassword =
  ({ oldPassword, newPassword, confirmPassword }) =>
  async (dispatch, getState) => {
    try {
      if (!getState().loading) dispatch(loadingActions.startLoading());
      const res = await authService.changePassword({ oldPassword, newPassword, confirmPassword });
      removeAccesToken();
      addAccesToken(res.data.token);
      await dispatch(thunk_getMe(false));
    } catch (error) {
      throw error.response.data;
    } finally {
      if (getState().loading) dispatch(loadingActions.stopLoading());
    }
  };

export const selectMe = (state) => state.myUser;
export default userSlice.reducer;
export const actions = userSlice.actions;
