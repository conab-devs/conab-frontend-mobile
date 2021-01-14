import React, {forwardRef} from 'react';
import {Text, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TextInputMask} from 'react-native-masked-text';

const Input = ({label, typeInput = 'normal', style, ...inputProps}, ref) => {
  const styles = getStyles(style);

  return (
  	  <>
	    <Text style={styles.text}>{label}</Text>
	    {typeInput === 'mask' ? (
	      <TextInputMask ref={ref} {...inputProps} style={styles.mask} />
	    ) : (
	      <TextInput ref={ref} {...inputProps} style={styles.mask} />
	    )}
	  </>
  );
};

const getStyles = (styles = {}) => {
	const {text} = styles;
	
	return EStyleSheet.create({
	  text: {
	  	  color: '$darkBlue',
		  fontSize: '1.12rem',
		  marginBottom: '0.31rem',
		  ...text
	  },
	  mask: {
	  	  fontSize: '1.12rem',
		  backgroundColor: '$lightGray',
		  borderRadius: 6,
		  height: '2.87rem',
		  paddingLeft: '.95rem',
		  paddingRight: '.95rem',
		  marginBottom: '.62rem',
		  ...styles.mask
	  }
	});
}

export default forwardRef(Input);
