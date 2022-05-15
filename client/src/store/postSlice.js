import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  currentPost: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      const postsReversed = action.payload.reverse();
      state.posts = postsReversed;
    },

    setSinglePost: (state, action) => {
      state.currentPost = action.payload;
    },

    addPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },

    changePost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        } else {
          return post;
        }
      });
      state.currentPost = action.payload;
    },

    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload._id);
      state.currentPost = null;
    },
  },
});

export const { setPosts, setSinglePost, addPost, changePost, removePost } = postSlice.actions;
export default postSlice.reducer;
