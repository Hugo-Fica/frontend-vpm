import { createSlice } from '@reduxjs/toolkit';

export const vectorSlice = createSlice({
  name: 'vector',
  initialState: {
    loading: 'not-loaded',
    ok: false,
    uid: null,
    vectors: [],
    errorMessage: null,
    activity: null,
    air_velocity: 0,
    area: null,
    area_m2: 0,
    availability: 0,
    criteria: null,
    fix_q: 0,
    power_input: 0,
    sub_area: null,
    vector_name: null,
    user: null,
    values: [],
    message: null,
  },
  reducers: {
    VectorStart: (state) => {
      state.loading = 'checking';
      state.vectors = [];
      state.errorMessage = null;
      state.activity = null;
      state.air_velocity = 0;
      state.area = null;
      state.area_m2 = 0;
      state.availability = 0;
      state.criteria = null;
      state.fix_q = 0;
      state.power_input = 0;
      state.sub_area = null;
      state.vector_name = null;
      state.user = null;
      state.values = [];
    },
    getVectorSucces: (state, { payload }) => {
      state.loading = 'succes';
      state.vectors = payload.data;
      state.errorMessage = null;
      state.activity = null;
      state.air_velocity = 0;
      state.area = null;
      state.area_m2 = 0;
      state.availability = 0;
      state.criteria = null;
      state.fix_q = 0;
      state.power_input = 0;
      state.sub_area = null;
      state.vector_name = null;
      state.user = null;
      state.values = [];
    },
    getVectorSuccesByid: (state, { payload }) => {
      state.loading = 'succes';
      state.uid = null;
      state.errorMessage = null;
      state.activity = payload.activity;
      state.air_velocity = payload.air_velocity;
      state.area = payload.area;
      state.area_m2 = payload.area_m2;
      state.availability = payload.availability;
      state.criteria = payload.criteria;
      state.fix_q = payload.fix_q;
      state.power_input = payload.power_input;
      state.sub_area = payload.sub_area;
      state.vector_name = payload.vector_name;
      state.user = payload.user;
      state.values = payload.values;
      state.message = null;
    },
    getVectorFailure: (state, { payload }) => {
      state.loading = 'not-loaded';
      state.uid = null;
      state.vectors = [];
      state.errorMessage = payload.errorMessage;
      state.activity = null;
      state.air_velocity = 0;
      state.area = null;
      state.area_m2 = 0;
      state.availability = 0;
      state.criteria = null;
      state.fix_q = 0;
      state.power_input = 0;
      state.sub_area = null;
      state.vector_name = null;
      state.user = null;
      state.values = [];
      state.message = null;
    },
    postVectorStart: (state) => {
      state.loading = 'checking';
      state.errorMessage = null;
      state.message = null;
    },
    postVectorSucces: (state, { payload }) => {
      state.loading = 'succes';
      state.errorMessage = null;
      state.message = payload.message;
      state.uid = payload.uid;
      state.ok = true;
    },
    postVectorFailure: (state, { payload }) => {
      state.loading = 'not-loaded';
      state.errorMessage = payload.errorMessage;
      state.message = null;
      state.uid = null;
      state.ok = false;
    },
    putVectorStart: (state) => {
      state.loading = 'checking';
      state.message = null;
      state.errorMessage = null;
    },
    putVectorSucces: (state, { payload }) => {
      state.loading = 'succes';
      state.message = payload.message;
      state.errorMessage = null;
      state.vectors = payload.data;
    },
    putVectorFailure: (state, { payload }) => {
      state.loading = 'not-loaded';
      state.message = null;
      state.errorMessage = payload.errorMessage;
    },
    deleteVectorStart: (state) => {
      state.loading = 'checking';
      state.message = null;
      state.errorMessage = null;
    },
    deleteVectorSucces: (state, { payload }) => {
      state.loading = 'success';
      state.message = payload.message;
      state.errorMessage = null;
    },
    deleteVectorFailure: (state, { payload }) => {
      state.loading = 'not-loaded';
      state.message = null;
      state.errorMessage = payload.errorMessage;
    },
  },
});

export const {
  VectorStart,
  getVectorSucces,
  getVectorSuccesByid,
  getVectorFailure,
  postVectorStart,
  postVectorSucces,
  postVectorFailure,
  putVectorStart,
  putVectorSucces,
  putVectorFailure,
  deleteVectorStart,
  deleteVectorSucces,
  deleteVectorFailure,
} = vectorSlice.actions;
