import { createSlice } from '@reduxjs/toolkit';

export const criteriaSlice = createSlice({
  name: 'criteria',
  initialState: {
    criterias: [],
    loading: false,
    errorMessage: null,
  },
  reducers: {
    getCriteriasStart: (state) => {
      state.loading = true;
      state.criterias = [];
      state.errorMessage = null;
    },
    getCriteriasSuccess: (state, { payload }) => {
      state.loading = false;
      state.criterias = payload.data;
      state.errorMessage = null;
    },
    getCriteriasFailure: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload.errorMessage;
      state.criterias = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCriteriasStart, getCriteriasSuccess, getCriteriasFailure } =
  criteriaSlice.actions;
