import React from 'react';
import {Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Error = ({touched, error}) =>
  touched && error ? <Text style={styles.error}>{error}</Text> : null;

const styles = EStyleSheet.create({
  error: {
    color: '$red',
    fontSize: '.8rem',
  },
});

export default Error;
