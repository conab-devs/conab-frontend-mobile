import {put} from 'redux-saga/effects';
import {Alert} from 'react-native';

export default function* handleUnauthorized(err, message) {
  if (err.response.status === 401) {
    yield put(logout());
  } else {
    Alert.alert(message);
  }
}