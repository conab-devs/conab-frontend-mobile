import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {darkblue, green} from './styles/colors';

import SignIn from './screens/sign-in';
import SignUp from './screens/sign-up';
import Categories from './screens/categories';
import Profile from './screens/Profile';
import Chat from './screens/Chat';
import Notification from './screens/Notification';
import ForgotPasswordRequest from './screens/ForgotPassword/Request';
import ForgotPasswordCode from './screens/ForgotPassword/Code';
import ForgotPasswordResetPassword from './screens/ForgotPassword/ResetPassword';
import TabBar from './components/tab-bar';
import Header from './components/header';
import Products from './screens/Products';
import Search from './components/search';
import Filter from './screens/Filter';
import CreateProduct from './screens/CreateProduct';
import ViewProduct from './screens/ViewProduct';
import Cart from './screens/Cart';

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

const headerIconsSize = 30;
const arrowIconSize = 38;

const Home = () => {
  return (
    <Stack.Navigator initialRouteName="Categories">
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
          headerRight: (
            <Icon
              name="cart"
              color={darkblue}
              size={headerIconsSize}
              onPress={() => {
                return navigation.navigate('Cart');
              }}
            />
          ),
          ...homeOptions,
        })}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options={({navigation}) => ({
          ...homeOptions,
          title: 'Produtos',
          headerLeft: (
            <Icon
              name="chevron-left"
              color={darkblue}
              size={arrowIconSize}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: (
            <Icon
              name="cart"
              color={darkblue}
              size={headerIconsSize}
              onPress={() => {
                return navigation.navigate('Cart');
              }}
            />
          ),
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
      <Stack.Screen
        name="RegisterProduct"
        component={CreateProduct}
        options={({navigation}) => ({
          title: 'Produto',
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {paddingLeft: sidePadding},
          headerRightContainerStyle: {paddingRight: sidePadding},
          headerStyle: {backgroundColor: green, height: 70},
          headerTitleStyle: {color: darkblue, fontWeight: 'bold', fontSize: 24},
          headerLeft: (props) => (
            <Icon
              name="chevron-left"
              color={darkblue}
              size={arrowIconSize}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ViewProduct"
        component={ViewProduct}
        options={({navigation}) => ({
          ...homeOptions,
          title: 'Produto',
          headerLeft: (
            <Icon
              name="menu"
              color={darkblue}
              size={headerIconsSize}
              onPress={() => ''}
            />
          ),
          headerRight: (
            <Icon
              name="cart"
              color={darkblue}
              size={headerIconsSize}
              onPress={() => {
                return navigation.navigate('Cart');
              }}
            />
          ),
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
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={({navigation}) => ({
          title: 'Minha Cesta',
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {paddingLeft: sidePadding},
          headerRightContainerStyle: {paddingRight: sidePadding},
          headerStyle: {backgroundColor: green, height: 70},
          headerTitleStyle: {color: darkblue, fontWeight: 'bold', fontSize: 24},
          headerLeft: (props) => (
            <Icon
              name="chevron-left"
              color={darkblue}
              size={arrowIconSize}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const TabNavigation = () => (
  <BottomTab.Navigator
    tabBar={(props) => <TabBar {...props} />}
    tabBarOptions={{
      keyboardHidesTabBar: true,
      activeTintColor: green,
      inactiveTintColor: '#fff',
      showLabel: false,
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
          <Icon name="home-circle" color={color} size={headerIconsSize} />
        ),
      }}
    />
    <BottomTab.Screen
      name="profile"
      component={Profile}
      options={{
        tabBarLabel: 'Perfil',
        tabBarIcon: ({color, size}) => (
          <Icon name="account-circle" color={color} size={headerIconsSize} />
        ),
      }}
    />
    <BottomTab.Screen
      name="chat"
      component={Chat}
      options={{
        tabBarLabel: 'Chat',
        tabBarIcon: ({color, size}) => (
          <Icon name="chat-processing" color={color} size={headerIconsSize} />
        ),
      }}
    />
    <BottomTab.Screen
      name="notification"
      component={Notification}
      options={{
        tabBarLabel: 'Notificações',
        tabBarIcon: ({color, size}) => (
          <Icon name="bell-circle" color={color} size={headerIconsSize} />
        ),
      }}
    />
  </BottomTab.Navigator>
);

const Routes = () => {
  const signed = useSelector((state) => state.auth.signed);

  return signed ? (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="Main" component={TabNavigation} />
      <Stack.Screen name="Filter" component={Filter} />
    </Stack.Navigator>
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
              <Icon name="chevron-left" size={arrowIconSize} color={color} />
            </TouchableOpacity>
          ),
        }}
      />

      {/* ForgotPassword */}

      <Stack.Screen
        name="forgotpassword-request"
        component={ForgotPasswordRequest}
        options={{
          title: 'Redefinir senha',
          headerTitleStyle: {fontSize: 24},
          headerLeft: ({color, onPress}) => (
            <TouchableOpacity onPress={onPress}>
              <Icon name="chevron-left" size={arrowIconSize} color={color} />
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
              <Icon name="chevron-left" size={arrowIconSize} color={color} />
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
              <Icon name="chevron-left" size={arrowIconSize} color={color} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
