import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Dropdown from 'react-native-picker-select';

import Error from './error';

const Input = (props) => {
  const {
    label,
    onValueChange,
    items,
    style,
    placeholder,
    error,
    touched,
  } = props;
  const styles = getStyles(style);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.dropdownHolder}>
        <Dropdown
          placeholder={{
            label: placeholder,
            value: null,
          }}
          useNativeAndroidPickerStyle={false}
          onValueChange={onValueChange}
          style={stylesDropdown}
          items={items}
        />
      </View>
      <Error error={error} touched={touched} />
    </View>
  );
};

const getStyles = (styles = {}) =>
  EStyleSheet.create({
    dropdownHolder: {
      borderRadius: 5,
      overflow: 'hidden',
      marginBottom: '.2rem',
    },
    label: {
      color: '$darkBlue',
      fontSize: '1rem',
      marginBottom: '0.31rem',
    },
    container: {
      ...styles.container,
    },
  });

const stylesDropdown = EStyleSheet.create({
  inputAndroid: {
    backgroundColor: '$lightGray',
    borderRadius: 6,
    height: '2.87rem',
    paddingLeft: '.95rem',
    paddingRight: '.95rem',
    color: '$darkBlue',
    fontSize: '1rem',
  },
  inputIOS: {
    backgroundColor: '$lightGray',
    borderRadius: 6,
    height: '2.87rem',
    paddingLeft: '.95rem',
    paddingRight: '.95rem',
    fontSize: '1rem',
  },
  placeholder: {
    color: '$mediumGray',
  },
});

export default Input;
