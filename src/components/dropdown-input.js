import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Dropdown from 'react-native-picker-select';

const Input = ({label, onValueChange, items, style, placeholder}) => {
  const styles = getStyles(style);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.dropdownHolder}>
        <Dropdown
          placeholder={{
            label: placeholder,
            value: null,
          }}
          onValueChange={onValueChange}
          style={stylesDropdown}
          items={items}
        />
      </View>
    </View>
  );
};

const getStyles = (styles = {}) =>
  EStyleSheet.create({
    dropdownHolder: {
      borderRadius: 5,
      overflow: 'hidden',
    },
    label: {
      color: '$darkBlue',
      fontSize: '1.12rem',
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
    marginBottom: '.62rem',
  },
  inputIOS: {
    backgroundColor: '$lightGray',
    borderRadius: 6,
    height: '2.87rem',
    paddingLeft: '.95rem',
    paddingRight: '.95rem',
    color: '$darkBlue',
    marginBottom: '.62rem',
  },
});

export default Input;
