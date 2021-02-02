import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Routes from './Routes';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import EStyleSheet from 'react-native-extended-stylesheet';

import {darkblue} from './styles/colors';
import {store, persistor} from './redux';
import {Provider as PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor={darkblue} />
            <Routes />
          </NavigationContainer>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};

EStyleSheet.build({
  '@media (min-width: 361)': {
    $rem: 16,
  },
  '@media (max-width: 360)': {
    $rem: 14,
  },
  $darkBlue: '#363D46',
  $green: '#59D094',
  $lightGray: '#F5F5F5',
  $mediumGray: '#828282',
  $red: '#FF4040',
});

export default App;
