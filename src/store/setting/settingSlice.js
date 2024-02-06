import { createSlice } from '@reduxjs/toolkit';

export const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    loading: false,
    id: null,
    unit: null,
    leakage: null,
    value_leakage: null,
    period: null,
    message: null,
    errorMessage: null,
  },
  reducers: {
    getSettingStart: (state) => {
      state.loading = true;
      state.id = null;
      state.unit = null;
      state.leakage = null;
      state.value_leakage = null;
      state.period = null;
    },
    getSettingSucces: (state, { payload }) => {
      state.loading = false;
      state.id = payload.id;
      state.unit = payload.unit;
      state.leakage = payload.leakage;
      state.value_leakage = payload.value_leakage;
      state.period = payload.period;
    },
    getSettingFailure: (state) => {
      state.loading = false;
      state.id = null;
      state.unit = null;
      state.leakage = null;
      state.value_leakage = null;
      state.period = null;
    },
    putSettingStart: (state) => {
      state.loading = true;
    },
    putSettingSucces: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.errorMessage = null;
    },
    putSettingFailure: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.errorMessage = payload.errorMessage;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getSettingStart,
  getSettingSucces,
  getSettingFailure,
  putSettingStart,
  putSettingSucces,
  putSettingFailure,
} = settingSlice.actions;
