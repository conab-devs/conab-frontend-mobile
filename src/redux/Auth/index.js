import {createSlice} from '@reduxjs/toolkit';

const {reducer, actions} = createSlice({
  name: 'auth',
  initialState: {
    signed: false,
    token: '',
    user: {},
  },
  reducers: {
    loginSuccess: (state, {payload}) => {
      state.signed = true;
      state.token = payload.token;
      state.user = {
        ...payload.user,
        profile_picture: payload.user.profile_picture,
      };
    },

    updateUserData: (state, {payload}) => {
      state.user = {
        ...payload.user,
        profile_picture: payload.user.profile_picture,
      };
    },

    updateAvatar: (state, {payload}) => {
      state.user.profile_picture = payload.profile_picture;
    },

    logout: (state) => {
      state.signed = false;
      state.token = '';
      state.user = {};
    },
  },
});

export const {logout, loginSuccess, updateUserData, updateAvatar} = actions;

export default reducer;
