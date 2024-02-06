import { createSlice } from '@reduxjs/toolkit';

export const areaSlice = createSlice({
  name: 'area',
  initialState: {
    areas: [],
    loading: false,
    errorMessage: null,
    message: null,
  },
  reducers: {
    getAreasStart: (state) => {
      state.loading = true;
      state.areas = [];
      state.errorMessage = null;
    },
    getAreasSuccess: (state, { payload }) => {
      state.loading = false;
      state.areas = payload.data;
      state.errorMessage = null;
    },
    getAreasFailure: (state, { payload }) => {
      state.loading = false;
      state.areas = [];
      state.errorMessage = payload.errorMessage;
    },
    deleteAreaStart: (state) => {
      state.loading = true;
      state.errorMessage = null;
    },
    deleteAreaSucces: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.errorMessage = null;
    },
    deleteAreaFailure: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload.errorMessage;
    },
    postAreaStart: (state) => {
      state.loading = true;
    },
    postAreaSucces: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
    },
    postAreaFailure: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload.errorMessage;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getAreasStart,
  getAreasSuccess,
  getAreasFailure,
  deleteAreaStart,
  deleteAreaSucces,
  deleteAreaFailure,
  postAreaStart,
  postAreaSucces,
  postAreaFailure,
} = areaSlice.actions;
