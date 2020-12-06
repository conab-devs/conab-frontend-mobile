import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Routes from './Routes';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import './reactotron';

import {darkblue} from './styles/colors';
import {store, persistor} from './redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {FilterContext} from './contexts';
import {maxPrice} from './variables';

const App = () => {
  const [settings, setSettings] = useState({
    lowestPrice: 0,
    greatestPrice: maxPrice,
    order: 'asc',
    searchString: '',
  });

  return (
    <Provider store={store}>
      <PaperProvider>
        <PersistGate persistor={persistor}>
          <FilterContext.Provider value={{settings, setSettings}}>
            <NavigationContainer>
              <StatusBar barStyle="light-content" backgroundColor={darkblue} />
              <Routes />
            </NavigationContainer>
          </FilterContext.Provider>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};

export default App;
