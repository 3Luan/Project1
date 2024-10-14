import toast from "react-hot-toast";
import {
  getHistoryPostsAPI,
  getPostsAPI,
  getUnapprovedPostsAPI,
  toggleLikePostAPI,
} from "../../services/postService";
import { getPost, getPostError, getPostSuccess } from "./postSlice";

export const handleGetPosts = (currentPage) => {
  return async (dispatch, getState) => {
    dispatch(getPost());

    let res = await getPostsAPI(currentPage);

    if (res) {
      if (res.code === 0) {
        dispatch(getPostSuccess(res));
      } else {
        dispatch(getPostError());
      }
    } else {
      dispatch(getPostError());
    }
  };
};

export const handleGetUnapprovedPosts = (currentPage) => {
  return async (dispatch, getState) => {
    dispatch(getPost());

    let res = await getUnapprovedPostsAPI(currentPage);

    if (res) {
      if (res.code === 0) {
        dispatch(getPostSuccess(res));
      } else {
        dispatch(getPostError());
      }
    } else {
      dispatch(getPostError());
    }
  };
};

export const handlegetHistoryPosts = (currentPage) => {
  return async (dispatch, getState) => {
    dispatch(getPost());

    let res = await getHistoryPostsAPI(currentPage);

    if (res) {
      if (res.code === 0) {
        dispatch(getPostSuccess(res));
      } else {
        dispatch(getPostError());
      }
    } else {
      dispatch(getPostError());
    }
  };
};
