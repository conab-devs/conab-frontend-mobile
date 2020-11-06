import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, TouchableOpacity, ShadowPropTypesIOS} from 'react-native';

import SignIn from './screens/SignIn';
import SignOut from './screens/SignUp';
import {darkblue} from './styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: darkblue,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="signin"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="signup"
        component={SignOut}
        options={{
          title: 'Criar conta',
          headerTitleStyle: {fontSize: 24},
          headerLeft: ({color, onPress}) => (
            <TouchableOpacity onPress={onPress}>
              <Icon name="chevron-left" size={40} color={color} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
