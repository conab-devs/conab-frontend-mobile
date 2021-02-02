import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Error from './error';
import Input from './input';

const LabeledInput = (props) => {
  const {label, inputLabel, style, error, touched, ...inputProps} = props;
  const styles = getStyles(style);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.deliveryTime}>
        <Input
          style={{
            mask: {
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
            },
            text: {
              display: 'none',
            },
            container: {
              width: '80%',
            },
          }}
          {...inputProps}
        />
        <View style={styles.measureContainer}>
          <Text style={styles.measure}>{inputLabel}</Text>
        </View>
      </View>
      <Error error={error} touched={touched} />
    </View>
  );
};

const getStyles = (styles = {}) =>
  EStyleSheet.create({
    container: {
      ...styles.container,
    },
    deliveryTime: {
      flexDirection: 'row',
      height: '2.87rem',
    },
    measureContainer: {
      backgroundColor: '#e0e0e0',
      width: '20%',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,
    },
    label: {
      fontSize: '1rem',
      color: '$darkBlue',
      marginBottom: '.32rem',
    },
    measure: {
      fontSize: '1rem',
      color: '#828282',
    },
  });

export default LabeledInput;
