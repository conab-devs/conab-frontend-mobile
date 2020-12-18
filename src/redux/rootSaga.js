import {all} from 'redux-saga/effects';

import auth from './Auth/sagas';
import Product from './Product/sagas';


export default function* rootSaga() {
  return yield all([auth, Product]);
}
