import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';

import {logout} from '../redux/Auth';

const Logout = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);
  return <View />;
};

export default Logout;
