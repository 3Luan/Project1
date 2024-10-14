import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import postSlice from "./post/postSlice";
import postDetailsSlice from "./postDetails/postDetailsSlice";
import postUtc2Slice from "./postUtc2/postUtc2Slice";
import postDetailsUtc2Slice from "./postDetailsUtc2/postDetailsUtc2Slice";
import replySlice from "./reply/replySlice";
import authAdminSlice from "./authAdmin/authAdminSlice";

export default configureStore({
  reducer: {
    auth: authSlice,

    postUtc2: postUtc2Slice,
    postDetailsUtc2: postDetailsUtc2Slice,

    post: postSlice,
    postDetails: postDetailsSlice,

    reply: replySlice,

    // Admin
    authAdmin: authAdminSlice,
  },
});
