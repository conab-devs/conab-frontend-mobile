import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Routes from './Routes';
import {StatusBar} from 'react-native';
import {darkblue} from './styles/colors';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={darkblue} />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
