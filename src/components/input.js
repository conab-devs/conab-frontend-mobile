import React, {forwardRef} from 'react';
import {View, Text, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CurrencyInput from 'react-native-currency-input';

import Error from './error';

const Input = (props, ref) => {
  const styles = getStyles(props.style);
  const {label, typeInput, style, touched, error, ...inputProps} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      {typeInput === 'mask' ? (
        <CurrencyInput {...inputProps} style={styles.mask} />
      ) : (
        <TextInput
          placeholderTextColor={styles.mask.color}
          ref={ref}
          {...inputProps}
          style={styles.mask}
        />
      )}
      <Error error={error} touched={touched} />
    </View>
  );
};

const getStyles = (styles = {}) => {
  const {text} = styles;

  return EStyleSheet.create({
    text: {
      color: '$darkBlue',
      fontSize: '1rem',
      marginBottom: '0.31rem',
      ...text,
    },
    mask: {
      fontSize: '1rem',
      color: '$mediumGray',
      backgroundColor: '$lightGray',
      borderRadius: 6,
      height: '2.87rem',
      paddingLeft: '.95rem',
      paddingRight: '.95rem',
      ...styles.mask,
      marginBottom: '.2rem',
    },
    container: {
      marginBottom:
        styles.mask && styles.mask.marginBottom
          ? styles.mask.marginBottom
          : '.62rem',
      ...styles.container,
    },
  });
};

export default forwardRef(Input);
