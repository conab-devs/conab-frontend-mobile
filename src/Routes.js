import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';

import SignIn from './Components/SignIn';
import SignOut from './Components/SignUp';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const Routes = () => {
  const signIn = false;

  return signIn ? (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="test"
        component={
          <View>
            <Text>Teste</Text>
          </View>
        }
      />
    </BottomTab.Navigator>
  ) : (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="signin" component={SignIn} />
      <Stack.Screen name="signout" component={SignOut} />
    </Stack.Navigator>
  );
};

export default Routes;
