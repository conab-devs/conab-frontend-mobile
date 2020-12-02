import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {darkblue, green} from './styles/colors';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Categories from './screens/Categories';
import Profile from './screens/Profile';
import Chat from './screens/Chat';
import Notification from './screens/Notification';
import ForgotPasswordRequest from './screens/ForgotPassword/Request';
import ForgotPasswordCode from './screens/ForgotPassword/Code';
import ForgotPasswordResetPassword from './screens/ForgotPassword/ResetPassword';
import TabBar from './components/TabBar';
import Header from './components/Header';
import Products from './screens/Products';
import Search from './components/Search';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const sidePadding = 15;
const homeOptions = {
  title: 'Conarket',
  headerTitleAlign: 'center',
  headerLeftContainerStyle: {paddingLeft: sidePadding},
  headerRightContainerStyle: {paddingRight: sidePadding},
  headerStyle: {backgroundColor: green, height: 70},
  headerTitleStyle: {color: darkblue, fontWeight: 'bold', fontSize: 24},
  header: ({scene, previous, navigation}) => {
    const {options} = scene.descriptor;
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;

    return (
      <Header
        title={title}
        headerTitleStyle={options.headerTitleStyle}
        headerLeftContainerStyle={options.headerLeftContainerStyle}
        headerRightContainerStyle={options.headerRightContainerStyle}
        headerStyle={options.headerStyle}
        headerLeft={options.headerLeft}
        headerRight={options.headerRight}>
        <Search bottom={(35 / 2) * -1} />
      </Header>
    );
  },
};

const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={({navigation}) => ({
          headerLeft: (
            <Icon
              name="menu"
              color={darkblue}
              size={30}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: <Icon name="cart" color={darkblue} size={30} />,
          ...homeOptions,
        })}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options={({navigation}) => ({
          ...homeOptions,
          headerLeft: (
            <Icon
              name="arrow-left"
              color={darkblue}
              size={30}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: <Icon name="cart" color={darkblue} size={30} />,
          header: ({scene}) => {
            const {options} = scene.descriptor;
            const title =
              options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                ? options.title
                : scene.route.name;

            return (
              <Header
                title={title}
                headerTitleStyle={options.headerTitleStyle}
                headerLeftContainerStyle={options.headerLeftContainerStyle}
                headerRightContainerStyle={options.headerRightContainerStyle}
                headerStyle={options.headerStyle}
                headerLeft={options.headerLeft}
                headerRight={options.headerRight}
              />
            );
          },
        })}
      />
    </Stack.Navigator>
  );
};

const Routes = () => {
  const signed = useSelector((state) => state.auth.signed);

  return signed ? (
    <BottomTab.Navigator
      tabBar={(props) => <TabBar {...props} />}
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
        component={SignUp}
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

      {/* ForgotPassowrd */}

      <Stack.Screen
        name="forgotpassword-request"
        component={ForgotPasswordRequest}
        options={{
          title: 'Redefinir senha',
          headerTitleStyle: {fontSize: 24},
          headerLeft: ({color, onPress}) => (
            <TouchableOpacity onPress={onPress}>
              <Icon name="chevron-left" size={40} color={color} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="forgotpassword-code"
        component={ForgotPasswordCode}
        options={{
          title: 'Redefinir senha',
          headerTitleStyle: {fontSize: 24},
          headerLeft: ({color, onPress}) => (
            <TouchableOpacity onPress={onPress}>
              <Icon name="chevron-left" size={40} color={color} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="forgotpassword-resetpassword"
        component={ForgotPasswordResetPassword}
        options={{
          title: 'Redefinir senha',
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
