import { configureStore } from "@reduxjs/toolkit";
import campReducer from "./campSlice";
import campsReducer from "./campsSlice";
import loadingReducer from "./loadingSlice";
import myUserReducer from "./myUserSlice";

export default configureStore({
  reducer: {
    camp: campReducer,
    camps: campsReducer,
    loading: loadingReducer,
    myUser: myUserReducer
  }
});
