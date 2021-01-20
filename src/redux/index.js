import {configureStore, combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootSaga from './rootSaga';
import auth from './Auth';
import product from './Product';

const persistedReducers = persistReducer(
  {key: 'conarket', storage: AsyncStorage, whitelist: ['auth']},
  combineReducers({auth, product}),
);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducers,
  middleware: [sagaMiddleware],
});

const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export {store, persistor};
