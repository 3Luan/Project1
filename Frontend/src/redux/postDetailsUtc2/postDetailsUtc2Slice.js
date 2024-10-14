import { createSlice } from "@reduxjs/toolkit";

export const postDetailsUtc2Slice = createSlice({
  name: "postDetailsUtc2",
  initialState: {
    content: "",
    content_mobile: "",
    content_tablet: "",
    created_at: "",
    created_by: "",
    description: "",
    display: "",
    featured: "",
    image: "",
    post_attachments: [],
    post_connects: [],
    send_app: "",
    send_app_group: "",
    seo_text: "",
    sub_title: "",
    title: "",
    type: "",
    updated_at: "",
    updated_by: "",
    view: "",

    isLoading: false,
    isError: false,
  },
  reducers: {
    getPostById: (state) => {
      state.isLoading = true;
    },
    getPostByIdError: (state) => {
      state.content = "";
      state.content_mobile = "";
      state.content_tablet = "";
      state.created_at = "";
      state.created_by = "";
      state.description = "";
      state.display = "";
      state.featured = "";
      state.image = "";
      state.post_attachments = [];
      state.post_connects = [];
      state.send_app = "";
      state.send_app_group = "";
      state.seo_text = "";
      state.sub_title = "";
      state.title = "";
      state.type = "";
      state.updated_at = "";
      state.updated_by = "";
      state.view = "";

      state.isLoading = false;
      state.isError = true;
    },
    getPostByIdSuccess: (state, action) => {
      state.content = action.payload.content;
      state.content_mobile = action.payload.content_mobile;
      state.content_tablet = action.payload.content_tablet;
      state.created_at = action.payload.created_at;
      state.created_by = action.payload.created_by;
      state.description = action.payload.description;
      state.display = action.payload.display;
      state.featured = action.payload.featured;
      state.image = action.payload.image;
      state.post_attachments = action.payload.post_attachments;
      state.post_connects = action.payload.post_connects;
      state.send_app = action.payload.send_app;
      state.send_app_group = action.payload.send_app_group;
      state.seo_text = action.payload.seo_text;
      state.sub_title = action.payload.sub_title;
      state.title = action.payload.title;
      state.type = action.payload.type;
      state.updated_at = action.payload.updated_at;
      state.updated_by = action.payload.updated_by;
      state.view = action.payload.view;

      state.isLoading = false;
      state.isError = false;
    },
  },
});

export const { getPostById, getPostByIdError, getPostByIdSuccess } =
  postDetailsUtc2Slice.actions;

export default postDetailsUtc2Slice.reducer;
