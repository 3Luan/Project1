import { createSlice } from "@reduxjs/toolkit";

export const postUtc2Slice = createSlice({
  name: "postUtc2",
  initialState: {
    count: "",
    currentPage: "",
    totalPages: "",
    rows: [],

    isLoading: false,
    isError: false,
  },
  reducers: {
    getPostUtc2: (state) => {
      state.isLoading = true;
    },
    getPostUtc2Error: (state) => {
      state.count = "";
      state.currentPage = "";
      state.totalPages = "";
      state.rows = [];

      state.isLoading = false;
      state.isError = true;
    },
    getPostUtc2Success: (state, action) => {
      state.count = action.payload.count;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.rows = action.payload.rows;

      state.isLoading = false;
      state.isError = false;
    },
  },
});

export const { getPostUtc2, getPostUtc2Error, getPostUtc2Success } =
  postUtc2Slice.actions;

export default postUtc2Slice.reducer;
