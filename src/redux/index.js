import {configureStore, combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootSaga from './rootSaga';
import auth from './Auth';

const persistedReducers = persistReducer(
  {key: 'conarket', storage: AsyncStorage, whitelist: ['auth']},
  combineReducers({auth}),
);

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({sagaMonitor});

const reactotronEnhancer = __DEV__ ? console.tron.createEnhancer() : null;

const store = configureStore({
  reducer: persistedReducers,
  middleware: [sagaMiddleware],
  enhancers: [reactotronEnhancer],
});

const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export {store, persistor};
