import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const InfoDisplayer = ({label, content, style}) => {
  const styles = getStyles(style);
  return (
    <View style={styles.infoGroup}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.info}>{content}</Text>
    </View>
  );
}

const getStyles = (styles) => (
  EStyleSheet.create({
	  infoGroup: {
	    marginTop: 0,
	    ...styles,
	  },
	  infoLabel: {
	    fontSize: '1rem',
	  },
	  info: {
	    fontSize: '1.25rem',
	  },
  })
);

export default InfoDisplayer;