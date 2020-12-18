import {Alert} from 'react-native';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import api from '../../services/api';

import {allActions} from '.';

// // function* loginUser({payload}) {
// //   try {
// //     const httpResponse = yield call(api.post, '/login', {...payload});
// //     const {token, user} = httpResponse.data;
// //     api.defaults.headers.Authorization = `Bearer ${token}`;
// //     yield put(loginSuccess({token, user}));
// //   } catch (error) {
// //     Alert.alert('Falha na autenticação', 'E-mail ou senha inválidos');
// //     console.tron.log(error);
// //   }
// // }

// // function setToken({payload}) {
// //   if (payload && payload.auth && payload.auth.token) {
// //     api.defaults.headers.Authorization = `Bearer ${payload.auth.token}`;
// //   }
// // }

// // export default all([
// //   takeLatest(login.toString(), loginUser),
// //   takeLatest('persist/REHYDRATE', setToken),
// // ]);

function* getCategories({payload}) {
  console.log('entrou');
  try {
    const {data} = yield call(api.get, '/categories');
    
    yield put(allActions.setCategories({categories: data}));
  } catch (err) {
    Alert.alert(err);
  }
}

// function* getProducts({payload}) {
//   try {
//     console.log(payload);

//     const {data} = yield call(api.get, `/products?page=${payload.page}&category=${payload.categoryId}&min_price=${payload.lowestPrice}&max_price=${payload.greatestPrice}&order=${payload.order}&name=${payload.searchString}`);
//     console.log(payload);
//     yield put(allActions.setProducts({products: data.data, lastPage: data.last_page}));
//   } catch (err) {
//     Alert.alert('Falha na listagem de produtos');
//   }
// }

export default all([
  takeLatest(allActions.fetchCategories.toString(), getCategories),
//   takeLatest(allActions.fetchProducts.toString(), getProducts),
]);