import React from 'react';
import {View, Text} from 'react-native';
import {Items} from './styles';

const Header = (props) => {
  return (
    <View style={props.headerStyle}>
      <Items>
        <View style={props.headerLeftContainerStyle}>{props.headerLeft}</View>
        <View>
          <Text style={props.headerTitleStyle}>{props.title}</Text>
        </View>
        <View style={props.headerRightContainerStyle}>{props.headerRight}</View>
        {props.children}
      </Items>
    </View>
  );
};

export default Header;
