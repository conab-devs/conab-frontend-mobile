import {all, call, put, takeLatest, select} from 'redux-saga/effects';

import api from '../../services/api';

import {allActions} from '.';

import {logout} from '../Auth';

import handleUnauthorizedError from '../errorHandler';

function* fetchCategories() {
  try {
    const {data} = yield call(api.get, '/categories');
    yield put(allActions.setCategories({categories: data}));
  } catch (err) {
    yield handleUnauthorized(err, 'Falha ao listar categorias');
  }
}

function* fetchProducts({payload}) {
  try {
    const {data} = yield call(
      api.get,
      '/products', 
      {
        params: {
           page: payload.page,
           category: payload.categoryId,
           min_price: payload.lowestPrice,
           max_price: payload.greatestPrice,
           order: payload.order,
           name: payload.searchString
        },
      }
    );
    yield put(
      allActions.setProducts({products: [...payload.previous, ...data.data]}),
    );
    yield put(allActions.setLastPage({lastPage: data.last_page}));
  } catch (err) {
    yield handleUnauthorized(err, 'Falha na listagem de produtos');
  }
}

const getProducts = (state) => state.product.products;

function* createProduct({payload}) {
  try {
    const response = yield call(api.post, '/products', payload.product, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    });
    const products = yield select(getProducts);
    yield put(allActions.setProducts({products: [...products, response.data]}));
  } catch (err) {
    yield handleUnauthorized(err, 'Falha na adição do produto.');
  }
}

export default all([
  takeLatest(allActions.fetchCategories.toString(), fetchCategories),
  takeLatest(allActions.fetchProducts.toString(), fetchProducts),
  takeLatest(allActions.createProduct.toString(), createProduct),
]);
