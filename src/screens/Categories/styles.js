import styled from 'styled-components/native';
import {Container as C} from '../../styles/utils';
import {lightgray} from '../../styles/colors';

export const Container = styled(C)`
  background-color: ${lightgray};
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 35px;
`;

export const Category = styled.TouchableOpacity`
	height: 150px;
	background-color: white;
	width: 150px;
	border-radius: 12px;
	flex-direction: row;
	align-items: flex-end;
	justify-content: center;
	margin-bottom: 15px;
`;

export const Text = styled.Text`
	margin-bottom: 10px;
	font-size: 20px;
	font-weight: bold;
`;

export const ButtonText = styled.Text`
	font-size: 16px;
	font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
	height: 30px;
	width: 50%;
	background-color: white;
	border-radius: 12px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	align-self: flex-end;
`;