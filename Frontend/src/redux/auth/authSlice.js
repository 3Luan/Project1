import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: "",
    name: "",
    email: "",
    password: "",
    pic: "",
    isAdmin: "",
    postsSaved: [],
    gender: "",
    birth: "",

    isLoading: false,
    isInit: true,
    auth: false,
  },
  reducers: {
    register: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.password = "";
      state.pic = "";
      state.isAdmin = "";
      state.gender = "";
      state.birth = "";

      state.postsSaved = [];

      state.isLoading = true;
      state.isInit = false;
      state.auth = false;
    },
    registerError: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.password = "";
      state.pic = "";
      state.isAdmin = "";
      state.postsSaved = [];
      state.gender = "";
      state.birth = "";

      state.isLoading = false;
      state.isInit = false;
      state.auth = false;
    },
    registerSuccess: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.pic = action.payload.pic;
      state.isAdmin = action.payload.isAdmin;
      state.postsSaved = action.payload.postsSaved;
      state.gender = "";
      state.birth = "";

      state.isLoading = false;
      state.isInit = false;
      state.auth = true;
    },
    login: (state) => {
      // state.id = "";
      // state.name = "";
      // state.email = "";
      // state.password = "";
      // state.pic = "";
      // state.isAdmin = "";

      state.isLoading = true;
      state.isInit = false;
      state.auth = false;
    },
    loginError: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.password = "";
      state.pic = "";
      state.isAdmin = "";
      state.postsSaved = [];
      state.gender = "";
      state.birth = "";

      state.isLoading = false;
      state.isInit = false;
      state.auth = false;
    },
    loginSuccess: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.pic = action.payload.pic;
      state.isAdmin = action.payload.isAdmin;
      state.postsSaved = action.payload.postsSaved;
      state.gender = action.payload.gender;
      state.birth = action.payload.birth;

      state.isLoading = false;
      state.isInit = false;
      state.auth = true;
    },
    refresh: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.password = "";
      state.pic = "";
      state.isAdmin = "";
      state.postsSaved = [];
      state.gender = "";
      state.birth = "";

      state.isLoading = true;
      state.isInit = false;
      state.auth = false;
    },
    refreshError: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.password = "";
      state.pic = "";
      state.isAdmin = "";
      state.postsSaved = [];
      state.gender = "";
      state.birth = "";

      state.isLoading = false;
      state.isInit = false;
      state.auth = false;
    },
    refreshSuccess: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.pic = action.payload.pic;
      state.isAdmin = action.payload.isAdmin;
      state.postsSaved = action.payload.postsSaved;
      state.gender = action.payload.gender;
      state.birth = action.payload.birth;

      state.isLoading = false;
      state.isInit = false;
      state.auth = true;
    },
    logout: (state) => {
      state.isLoading = true;
      state.isInit = false;
    },
    logoutError: (state) => {
      state.isLoading = false;
      state.isInit = false;
    },
    logoutSuccess: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.password = "";
      state.pic = "";
      state.isAdmin = "";
      state.postsSaved = [];
      state.gender = "";
      state.birth = "";

      state.isLoading = false;
      state.isInit = false;
      state.auth = false;
    },
    updateSuccess: (state, action) => {
      state.name = action.payload.name;
      state.pic = action.payload.pic;
      state.gender = action.payload.gender;
      state.birth = action.payload.birth;
    },
  },
});

export const {
  register,
  registerError,
  registerSuccess,
  login,
  loginError,
  loginSuccess,
  refresh,
  refreshError,
  refreshSuccess,
  logout,
  logoutError,
  logoutSuccess,
  updateSuccess,
} = authSlice.actions;

export default authSlice.reducer;
