import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {darkblue, green} from './styles/colors';

import SignIn from './screens/SignIn';
import SignOut from './screens/SignUp';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Chat from './screens/Chat';
import Notification from './screens/Notification';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const Routes = () => {
  const signed = useSelector((state) => state.auth.signed);

  return signed ? (
    <BottomTab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: green,
        inactiveTintColor: '#fff',
        style: {
          backgroundColor: darkblue,
        },
      }}>
      <BottomTab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home-circle" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({color, size}) => (
            <Icon name="account-circle" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, size}) => (
            <Icon name="chat-processing" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="notification"
        component={Notification}
        options={{
          tabBarLabel: 'Notificações',
          tabBarIcon: ({color, size}) => (
            <Icon name="bell-circle" color={color} size={size} />
          ),
        }}
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
