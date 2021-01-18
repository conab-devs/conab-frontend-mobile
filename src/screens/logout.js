import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/Auth';
import {View} from 'react-native';

const Logout = ({ navigation }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logout());
	}, []);
	return (
		<View />
	);
}

export default Logout;