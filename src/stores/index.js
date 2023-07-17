import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./blogSlice";
import blogsReducer from "./blogsSlice";
import campReducer from "./campSlice";
import campsReducer from "./campsSlice";
import followListReducer from "./followListSlice";
import homeReducer from "./homeSlice";
import loadingReducer from "./loadingSlice";
import myUserReducer from "./myUserSlice";
import profielReducer from "./profileSlice";

export default configureStore({
  reducer: {
    blog: blogReducer,
    blogs: blogsReducer,
    camp: campReducer,
    camps: campsReducer,
    followList: followListReducer,
    home: homeReducer,
    loading: loadingReducer,
    myUser: myUserReducer,
    profile: profielReducer
  }
});
