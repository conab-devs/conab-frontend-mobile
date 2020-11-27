import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {darkblue} from '../../styles/colors';
import {Items, SearchContainer, Search} from './styles';

const Header = (props) => {
  return (
    <View style={props.headerStyle}>
      <Items>
        <View style={props.headerLeftContainerStyle}>
          <Icon name="menu" color={darkblue} size={30} />
        </View>
        <View>
          <Text style={props.headerTitleStyle}>{props.title}</Text>
        </View>
        <View style={props.headerRightContainerStyle}>
          <Icon name="cart" color={darkblue} size={30} />
        </View>
      </Items>
      <SearchContainer bottom={(35 / 2) * -1}>
        <Search placeholder="O que procura? Leite, biscoito, mel..." />
      </SearchContainer>
    </View>
  );
};

export default Header;
