import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './screens/SignIn';
import SignOut from './screens/SignUp';
import {darkblue} from './styles/colors';
import Test from './screens/Test';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const Routes = () => {
  const signed = useSelector((state) => state.auth.signed);

  return signed ? (
    <BottomTab.Navigator>
      <BottomTab.Screen name="test" component={Test} />
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
