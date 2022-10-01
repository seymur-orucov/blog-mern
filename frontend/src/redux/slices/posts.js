import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

// * FETCHING POSTS
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

// * FETCHING TAGS
export const fetchTags = createAsyncThunk("posts/fetchTags/", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

// * REMOVE POST
export const fetchRemovePost = createAsyncThunk(
  "auth/fetchRemovePost",
  async (id) => {
    await axios.delete(`/posts/${id}`);
  }
);

// * INITIAL STATE
const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

// * POSTS SLICE
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    [fetchRemovePost.pending]: (state, action) => {
      console.log(state.posts.items);
      state.posts.items = state.posts.items.filter(
        (item) => item._id !== action.meta.arg
      );
    },
  },
});

export const postsReducer = postsSlice.reducer;
