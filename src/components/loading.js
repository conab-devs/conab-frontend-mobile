import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {ActivityIndicator} from 'react-native';

import Container from './container';

const Loading = () => (
  <Container style={styles.container}>
    <ActivityIndicator size="small" color={styles.green.color} />
  </Container>
);

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  green: {
    color: '$green',
  },
});

export default Loading;
