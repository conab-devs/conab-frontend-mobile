import React from 'react';
import {Button, Text, View} from 'react-native';

const SignIn = ({navigation}) => (
  <View>
    <Text>Sign In</Text>
    <Button title="sign out" onPress={() => navigation.navigate('signout')} />
  </View>
);

export default SignIn;
