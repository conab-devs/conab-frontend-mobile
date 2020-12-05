import styled from 'styled-components';
import {Container as C} from '../../styles/utils';

export const Container = styled(C)`
  background-color: white;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const Label = styled.Text`
  font-size: 20px;
  margin-left: 5px;
`;

export const RadioGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PriceGroup = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 80%;
`;

export const OrderingContent = styled.View`
  margin-bottom: 20px;
`;

export const Button = styled.TouchableOpacity`
  align-self: center;
  border: 2px solid black;
  width: 250px;
  height: 40px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

export const ButtonContent = styled.Text`
  color: black;
  font-weight: bold;
  font-size: 16px;
`;
