import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';

import {logout} from '../redux/Auth';
import Button from '../components/button';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
  	<View>
	    <Text>Profile</Text>
	    <Button 
	    	title="Sair"
	    	size="small"
	    	type="danger"
	    	style={{
	    		btn: {
	    			marginLeft: 0,
	    		}
	    	}}
	    	onPress={() => dispatch(logout())}
	    />
  	</View>
  );
};

export default Profile;
