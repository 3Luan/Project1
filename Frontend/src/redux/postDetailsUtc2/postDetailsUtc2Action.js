import {
  getPostById,
  getPostByIdError,
  getPostByIdSuccess,
} from "./postDetailsUtc2Slice";
import { getPostByIdAPI } from "../../services/postUtc2Service";

export const handleGetPostById = (postUtc2Id) => {
  return async (dispatch, getState) => {
    dispatch(getPostById());

    let res = await getPostByIdAPI(postUtc2Id);

    if (res.status === "success") {
      dispatch(getPostByIdSuccess(res.responseData));
    } else {
      dispatch(getPostByIdError());
    }
  };
};
