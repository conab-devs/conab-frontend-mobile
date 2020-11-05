import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Routes from './Routes';
import {StatusBar} from 'react-native';
import {green} from './styles/colors';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={green} />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
