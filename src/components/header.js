import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Header = (props) => {
  return (
    <View style={props.headerStyle}>
      <View style={styles.items}>
        <View style={props.headerLeftContainerStyle}>{props.headerLeft}</View>
        <View>
          <Text style={props.headerTitleStyle}>{props.title}</Text>
        </View>
        <View style={props.headerRightContainerStyle}>{props.headerRight}</View>
        {props.children}
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  }
});

export default Header;
