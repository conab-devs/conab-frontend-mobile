import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '../../services/api';

import {login} from './actions';
import {loginSuccess} from '.';

function* loginUser({payload}) {
  try {
    const httpResponse = yield call(api.post, '/login', {...payload});
    const {token, user} = httpResponse.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(loginSuccess({token, user}));
  } catch (error) {
    console.log(error);
  }
}

function setToken({payload}) {
  if (payload && payload.auth && payload.auth.token) {
    api.defaults.headers.Authorization = `Bearer ${payload.auth.token}`;
  }
}

export default all([
  takeLatest(login.toString(), loginUser),
  takeLatest('persist/REHYDRATE', setToken),
]);
