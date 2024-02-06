import { createSlice } from '@reduxjs/toolkit';

export const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    activitys: [],
    loading: false,
    errorMessage: null,
    message: null,
  },
  reducers: {
    getActivityStart: (state) => {
      state.loading = true;
      state.activitys = [];
      state.errorMessage = null;
    },
    getActivitySuccess: (state, { payload }) => {
      state.loading = false;
      state.activitys = payload.data;
      state.errorMessage = null;
    },

    getActivityFailure: (state, { payload }) => {
      state.loading = false;
      state.activitys = [];
      state.errorMessage = payload.errorMessage;
    },
    deleteActivityStart: (state) => {
      state.loading = true;
      state.errorMessage = null;
      state.message = null;
    },
    deleteActivitySucces: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = null;
      state.message = payload.message;
    },
    deleteActivityFailure: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.errorMessage = payload.errorMessage;
    },
    postActivityStart: (state) => {
      state.loading = true;
      state.message = null;
      state.errorMessage = null;
    },
    postActivitySucces: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.errorMessage = null;
    },
    postActivityFailure: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.errorMessage = payload.errorMessage;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getActivityStart,
  getActivitySuccess,
  getActivityFailure,
  deleteActivityStart,
  deleteActivitySucces,
  deleteActivityFailure,
  postActivityStart,
  postActivitySucces,
  postActivityFailure,
} = activitySlice.actions;
