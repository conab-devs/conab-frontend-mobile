import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Routes from './Routes';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import './reactotron';

import {darkblue} from './styles/colors';
import {store, persistor} from './redux';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor={darkblue} />
          <Routes />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
