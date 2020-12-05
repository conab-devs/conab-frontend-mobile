import styled from 'styled-components/native';
import {Container as C} from './../../styles/utils';

export const FlatList = styled.FlatList`
  width: 100%;
`;

export const TextInput = styled.TextInput`
  background-color: white;
  width: 80%;
  height: 100%;
  color: #828282;
  font-size: 14px;
`;

export const Search = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  width: 100%;
  height: 40px;
  padding: 0 20px 0 20px;
`;

export const Filter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;
  width: 100%;
  height: 40px;
  padding: 0 20px 0 20px;
`;

export const FilterType = styled.Text`
  font-size: 12px;
  color: #828282;
`;

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const Wrapper = styled(C)`
  background-color: transparent;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 10px;
  padding-bottom: 10px;
`;
