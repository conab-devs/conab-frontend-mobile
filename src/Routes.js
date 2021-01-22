import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {darkblue, green} from './styles/colors';

import SignIn from './screens/sign-in';
import SignUp from './screens/sign-up';
import Categories from './screens/categories';
import Profile from './screens/profile';
import Chat from './screens/chat';
import Notification from './screens/notification';
import ForgotPasswordRequest from './screens/ForgotPassword/request';
import ForgotPasswordCode from './screens/ForgotPassword/code';
import ForgotPasswordResetPassword from './screens/ForgotPassword/reset-password';
import TabBar from './components/tab-bar';
import Header from './components/header';
import Products from './screens/products';
import Search from './components/search';
import Filter from './screens/filter';
import CreateProduct from './screens/create-product';
import ViewProduct from './screens/view-product';
import Cart from './screens/cart';
import Logout from './screens/logout';
import CooperativeProducts from './screens/cooperative-products';
import ShowProduct from './screens/show-product';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const sidePadding = 15;
const homeOptions = {
  title: 'Conarket',
  headerTitleAlign: 'center',
  headerLeftContainerStyle: {paddingLeft: sidePadding, width: 40},
  headerRightContainerStyle: {paddingRight: sidePadding, width: 40},
  headerStyle: {backgroundColor: green, height: 55},
  headerTitleStyle: {color: darkblue, fontWeight: 'bold', fontSize: 20},
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

const headerIconsSize = 25;
const arrowIconSize = 33;

const CooperativeAdministration = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CooperativeProducts"
        component={CooperativeProducts}
        options={({navigation}) => ({
          title: 'Meus Produtos',
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {paddingLeft: sidePadding, width: 40},
          headerRightContainerStyle: {paddingRight: sidePadding, width: 40},
          headerStyle: {backgroundColor: green, height: 55},
          headerTitleStyle: {color: darkblue, fontWeight: 'bold', fontSize: 20},
          headerLeft: (props) => (
            <Icon
              name="menu"
              color={darkblue}
              size={30}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ShowProduct"
        component={ShowProduct}
        options={({navigation}) => ({
          title: 'Produto',
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {paddingLeft: sidePadding, width: 40},
          headerRightContainerStyle: {paddingRight: sidePadding, width: 40},
          headerStyle: {backgroundColor: green, height: 55},
          headerTitleStyle: {color: darkblue, fontWeight: 'bold', fontSize: 20},
          headerLeft: (props) => (
            <Icon
              name="chevron-left"
              color={darkblue}
              size={30}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

const SideBar = () => {
  const { isProvider } = useSelector((state) => state.auth.user);
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Principal" component={Home} /> 
      <Drawer.Screen name="Meus Produtos" component={CooperativeAdministration} />
    </Drawer.Navigator>
  );
}

const Home = () => {
  const { isProvider } = useSelector(state => state.auth.user);
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={({navigation}) => ({
          headerLeft: (
            isProvider ? (<Icon
              name="menu"
              color={darkblue}
              size={30}
              onPress={() => navigation.toggleDrawer()}
            />) : null
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
          headerLeftContainerStyle: {paddingLeft: sidePadding, width: 40},
          headerRightContainerStyle: {paddingRight: sidePadding, width: 40},
          headerStyle: {backgroundColor: green, height: 55},
          headerTitleStyle: {color: darkblue, fontWeight: 'bold', fontSize: 20},
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
            isProvider ? (<Icon
              name="menu"
              color={darkblue}
              size={30}
              onPress={() => navigation.toggleDrawer()}
            />) : null
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
          headerLeftContainerStyle: {paddingLeft: sidePadding, width: 40},
          headerRightContainerStyle: {paddingRight: sidePadding, width: 40},
          headerStyle: {backgroundColor: green, height: 55},
          headerTitleStyle: {color: darkblue, fontWeight: 'bold', fontSize: 20},
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

const TabNavigation = () => {
  const { isProvider } = useSelector(state => state.auth.user);
  return (
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
        name="Home"
        component={isProvider ? SideBar : Home}
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
};

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
          headerTitleStyle: {fontSize: 20},
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
          headerTitleStyle: {fontSize: 20},
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
          headerTitleStyle: {fontSize: 20},
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
          headerTitleStyle: {fontSize: 18},
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
