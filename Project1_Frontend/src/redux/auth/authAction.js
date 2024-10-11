import toast from "react-hot-toast";
import {
  loginAPI,
  loginWithGoogleAPI,
  logoutAPI,
  refreshAPI,
  registerAPI,
} from "../../services/authService";
import {
  login,
  loginError,
  loginSuccess,
  logout,
  logoutError,
  logoutSuccess,
  refresh,
  refreshError,
  refreshSuccess,
  register,
  registerError,
  registerSuccess,
  updateSuccess,
} from "./authSlice";

export const handleRegister = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(register());

    let res = await registerAPI(name, email, password);

    if (res) {
      if (res.code === 0) {
        // Đăng ký thành công
        toast.success(res.message);
        dispatch(registerSuccess(res));
      } else if (res.code === 1) {
        // Đăng ký thất bại
        toast.error(res.message);
        dispatch(registerError());
      }
    } else {
      // Đăng ký thất bại
      toast.error("Error: Đăng ký");
      dispatch(registerError());
    }
  };
};

export const handleLogin = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(login());

    let res = await loginAPI(email, password);

    if (res) {
      if (res.code === 0) {
        // Đăng nhập thành công
        toast.success(res.message);
        dispatch(loginSuccess(res));
      } else if (res.code === 1) {
        // Đăng nhập thất bại
        toast.error(res.message);
        dispatch(loginError());
      }
    } else {
      // Đăng nhập thất bại
      toast.error("Error: Đăng nhập");
      dispatch(loginError());
    }
  };
};

export const handleUpdateProfile = () => {
  return async (dispatch, getState) => {
    let res = await refreshAPI();

    if (res) {
      if (res.code === 0) {
        dispatch(updateSuccess(res));
      }
    }
  };
};

export const handleRefresh = () => {
  return async (dispatch, getState) => {
    dispatch(refresh());

    let res = await refreshAPI();
    if (res) {
      if (res.code === 0) {
        // Refresh thành công
        dispatch(refreshSuccess(res));
      } else if (res.code === 1) {
        //Refresh thất bại
        dispatch(refreshError());
      }
    } else {
      //Refresh thất bại
      toast.error("Error: Refresh");
      dispatch(refreshError());
    }
  };
};
export const handleLogout = (navigate) => {
  return async (dispatch, getState) => {
    dispatch(logout());

    let res = await logoutAPI();

    if (res) {
      if (res.code === 0) {
        toast.success(res.message);
        dispatch(logoutSuccess());
        // Use history object to navigate
        navigate("/login");
      } else if (res.code === 1) {
        toast.error(res.message);
        dispatch(logoutError());
      }
    } else {
      dispatch(logoutError());
    }
  };
};
