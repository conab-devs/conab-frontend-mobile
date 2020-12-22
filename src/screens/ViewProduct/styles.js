import styled from 'styled-components/native';
import {Container as C} from './../../styles/utils';
import {darkblue} from '../../styles/colors';

export const Container = styled(C)`
  background-color: #ffffff;
  align-items: center;
  justify-content: flex-start;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const ProductName = styled.Text`
	font-size: 20px;
	color: #363D46;
	margin: 0 auto;
`;

export const InfoContainer = styled.View`
	align-self: flex-start;
	margin-top: 15px;
	width: 100%;
`;

export const Price = styled.Text`
	font-size: 20px;
	font-weight: bold;
	color: #363D46;
	margin-bottom: 15px;
`;

export const Text = styled.Text`
	font-size: 16px;
	color: #363D46;
`;

export const Delimiter = styled.View`
	height: 1px;
	width: 100%;
	background-color: #C4C4C4;
	margin: 10px 0;
`;

export const Space = styled.View`
	margin: 10px 0;
`;
