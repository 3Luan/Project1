import React, { useEffect, useState } from "react";
import {
  getSavePostIdAPI,
  savedPostdAPI,
  unSavedPostdAPI,
} from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { handleRefresh } from "../redux/auth/authAction";

const CustomButtomSavedPost = ({ postId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState();
  const [postSaveId, setPostSaveId] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    const data = await getSavePostIdAPI();

    if (data?.code === 0) {
      setPostSaveId(data?.data);
    } else {
      setPostSaveId([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsSaved(postSaveId.some((id) => id === postId));
  }, [postSaveId]);

  const onclickToggleFollow = async () => {
    setIsLoading(true);

    if (isSaved) {
      await toast.promise(unSavedPostdAPI(postId), {
        loading: "Loading...",
        success: (data) => {
          if (data.code === 0) {
            return data.message;
          } else {
            throw new Error(data.message);
          }
        },
        error: (error) => {
          return error.message;
        },
      });
    } else {
      await toast.promise(savedPostdAPI(postId), {
        loading: "Loading...",
        success: (data) => {
          if (data.code === 0) {
            return data.message;
          } else {
            throw new Error(data.message);
          }
        },
        error: (error) => {
          return error.message;
        },
      });
    }

    setIsSaved(!isSaved);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <>
          <button className="pl-2 text-xl font-semibold">
            <i className="fas fa-circle-notch fa-spin w-5 h-5"></i>
            <span className="text-base ml-2">Lưu</span>
          </button>
        </>
      ) : (
        <>
          <button
            className="pl-2 text-xl font-semibold text-slate-600"
            onClick={onclickToggleFollow}
          >
            {isSaved ? (
              <i className="fa-solid fa-bookmark  w-5 h-5"></i>
            ) : (
              <i className="fa-regular fa-bookmark  w-5 h-5"></i>
            )}
            <span className="text-base ml-2">Lưu</span>
          </button>
        </>
      )}
    </>
  );
};

export default CustomButtomSavedPost;
