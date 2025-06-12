import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  posts: [],
  userNotifications: {}, // Track notifications for each user
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.postId
      );
    },
    setNotifications: (state, action) => {
      const { userId, notifications } = action.payload;
      state.userNotifications[userId] = notifications;
    },
    addNotification: (state, action) => {
      const { userId, notification } = action.payload;
      if (!state.userNotifications[userId]) {
        state.userNotifications[userId] = [];
      }
      state.userNotifications[userId].push(notification);
    },
    removeNotification: (state, action) => {
      const { userId, notificationId } = action.payload;
      if (state.userNotifications[userId]) {
        state.userNotifications[userId] = state.userNotifications[
          userId
        ].filter((notification) => notification.id !== notificationId);
      }
    },
  },
});

export const {
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  removePost,
  setNotifications,
  addNotification,
  removeNotification,
} = authSlice.actions;
export default authSlice.reducer;
