import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated',
    uid: null,
    user_name: null,
    email: null,
    fname: null,
    lname: null,
    role_name: null,
    errorMessage: null,
    state: null,
    token: null,
    expiresAt: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.user_name = payload.user_name;
      state.email = payload.email;
      state.fname = payload.fname;
      state.lname = payload.lname;
      state.role_name = payload.role_name;
      state.state = payload.state;
      state.errorMessage = null;
      state.token = payload.token;
      state.expiresAt = payload.exp;
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.user_name = null;
      state.email = null;
      state.fname = null;
      state.lname = null;
      state.role_name = null;
      state.state = null;
      state.errorMessage = payload?.errorMessage;
      state.token = null;
      state.expiresAt = null;
    },
    checkinCredentials: (state) => {
      state.status = 'checking';
    },
  },
});

export const { login, logout, checkinCredentials } = authSlice.actions;
