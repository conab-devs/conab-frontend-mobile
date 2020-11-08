import {configureStore, combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootSaga from './rootSaga';
import auth from './Auth';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const persistedReducers = persistReducer(
  {key: 'conarket', storage: AsyncStorage, whitelist: ['auth']},
  combineReducers({auth}),
);

const middleware = createSagaMiddleware({sagaMonitor});

const store = configureStore({
  reducer: persistedReducers,
  middleware: [middleware],
});

const persistor = persistStore(store);
middleware.run(rootSaga);

export {store, persistor};
