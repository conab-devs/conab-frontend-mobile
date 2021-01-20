import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Button = ({type, title, style, ...buttonProps}) => {
  const styles = getStyles(style, type);
  return (
    <TouchableOpacity style={styles.btn} {...buttonProps}>
      <Text style={styles.text} type={type}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const getStyles = (styles = {}, type) => {
  let specificStyles = null;

  if (type === 'primary') {
    specificStyles = {backgroundColor: '$darkBlue'};
  } else {
    specificStyles = {
      backgroundColor: '$green',
      borderWidth: styles.borderWidth ? styles.borderWidth : 0,
    };
  }

  return EStyleSheet.create({
    text: {
      fontWeight: 'bold',
      fontSize: '1.5rem',
      color: type === 'primary' ? 'white' : '$darkBlue',
    },
    btn: {
      borderRadius: 6,
      marginTop: '0.31rem',
      marginBottom: '0.31rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      height: '2.87rem',
      borderColor: '$darkBlue',
      ...specificStyles,
      ...styles.btn,
    },
  });
};

export default Button;
