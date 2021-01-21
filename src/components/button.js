import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Button = ({type, title, size = 'big', style, ...buttonProps}) => {
  const styles = getStyles(style, type, size);
  return (
    <TouchableOpacity style={styles.btn} {...buttonProps}>
      <Text style={styles.text} type={type}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const getStyles = (styles = {}, type, size) => {
  let specificStyles = null;

  if (type === 'primary') {
    specificStyles = {backgroundColor: '$darkBlue'};
  } else if (type === 'danger') {
    specificStyles = {
      backgroundColor: '$red',
    };
  } else {
    specificStyles = {
      backgroundColor: '$green',
      borderWidth: styles.borderWidth ? styles.borderWidth : 0,
    };
  }

  return EStyleSheet.create({
    text: {
      fontWeight: 'bold',
      fontSize: size === 'big' ? '1.5rem' : '.9rem',
      color: type === 'primary' || type === 'danger' ? 'white' : '$darkBlue',
    },
    btn: {
      borderRadius: 6,
      marginTop: '0.31rem',
      marginBottom: '0.31rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      minWidth: size === 'big' ? '100%' : '30%',
      alignItems: 'center',
      justifyContent: 'center',
      height: size === 'big' ? '2.87rem' : '1.7rem',
      paddingRight: '.8rem',
      paddingLeft: '.8rem',
      borderColor: '$darkBlue',
      ...specificStyles,
      ...styles.btn,
    },
  });
};

export default Button;
