import {Alert} from 'react-native';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '../../services/api';

import {allActions} from '.';

function* getCategories() {
  try {
    const {data} = yield call(api.get, '/categories');
    yield put(allActions.setCategories({categories: data}));
  } catch (err) {
    Alert.alert(err);
  }
}

function* getProducts({payload}) {
  try {
    const {data} = yield call(api.get, `/products?page=${payload.page}&category=${payload.categoryId}&min_price=${payload.lowestPrice}&max_price=${payload.greatestPrice}&order=${payload.order}&name=${payload.searchString}`);
    yield put(allActions.setProducts({lastPage: data.last_page, products:[...payload.previous, ...data.data]}));
  } catch (err) {
    Alert.alert('Falha na listagem de produtos');
  }
}

export default all([
  takeLatest(allActions.fetchCategories.toString(), getCategories),
  takeLatest(allActions.fetchProducts.toString(), getProducts),
]);
