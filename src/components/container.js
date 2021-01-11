import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Container = ({ style, children }) => {
	const styles = getStyles(style);

	return (
		<View style={styles.container}>
			{children}
		</View>
	);
}

const getStyles = (styles) => {
	return EStyleSheet.create({
		container: {
			backgroundColor: '$green',
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			paddingTop: '1.87rem',
			paddingBottom: '1.87rem',
			paddingLeft: '1.25rem',
			paddingRight: '1.25rem',
			...styles,
		},
	});
};

export default Container;
