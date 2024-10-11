import {
  getPostDetailByIdAPI,
  getPostUnApprovedDetailByIdAPI,
} from "../../services/postService";
import {
  getPostById,
  getPostByIdError,
  getPostByIdSuccess,
} from "./postDetailsSlice";

export const handleGetPostDetailById = (postId) => {
  return async (dispatch, getState) => {
    dispatch(getPostById());

    let res = await getPostDetailByIdAPI(postId);

    if (res) {
      if (res.code === 0) {
        dispatch(getPostByIdSuccess(res.postDetail));
      } else {
        dispatch(getPostByIdError());
      }
    } else {
      dispatch(getPostByIdError());
    }
  };
};

export const handleGetPostUnApprovedDetail = (postId) => {
  return async (dispatch, getState) => {
    dispatch(getPostById());

    let res = await getPostUnApprovedDetailByIdAPI(postId);

    if (res) {
      if (res.code === 0) {
        dispatch(getPostByIdSuccess(res.postDetail));
      } else {
        dispatch(getPostByIdError());
      }
    } else {
      dispatch(getPostByIdError());
    }
  };
};
