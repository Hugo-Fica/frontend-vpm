import { createSlice } from '@reduxjs/toolkit';

export const subareaSlice = createSlice({
  name: 'subarea',
  initialState: {
    subareas: [],
    loading: false,
    errorMessage: null,
    message: null,
  },
  reducers: {
    getSubareasStart: (state) => {
      state.loading = true;
      state.subareas = [];
      state.errorMessage = null;
    },
    getSubareasSuccess: (state, { payload }) => {
      state.loading = false;
      state.subareas = payload.data;
      state.errorMessage = null;
    },
    getSubareasFailure: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload.errorMessage;
      state.subareas = [];
    },
    deleteSubareaStart: (state) => {
      state.loading = true;
      state.errorMessage = null;
      state.message = null;
    },
    deleteSubareaSucces: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = null;
      state.message = payload.message;
    },
    deleteSubareaFailure: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.errorMessage = payload.errorMessage;
    },
    postSubareaStart: (state) => {
      state.loading = true;
      state.message = null;
      state.errorMessage = null;
    },
    postSubareaSucces: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.errorMessage = null;
    },
    postSubareaFailure: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.errorMessage = payload.errorMessage;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getSubareasStart,
  getSubareasSuccess,
  getSubareasFailure,
  deleteSubareaStart,
  deleteSubareaSucces,
  deleteSubareaFailure,
  postSubareaStart,
  postSubareaSucces,
  postSubareaFailure,
} = subareaSlice.actions;
