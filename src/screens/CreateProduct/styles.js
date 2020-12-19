import styled from 'styled-components/native';
import {Container as C} from './../../styles/utils';
import {darkblue} from './../../styles/colors';

export const Container = styled(C)`
  flex: 1;
  padding: 20px 20px;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: white;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Group = styled.View`
  width: 100%;
  margin-top: 15px;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: ${darkblue};
  margin-bottom: 7px;
`;

export const Input = styled.TextInput`
  background-color: #f5f5f5;
  width: 100%;
  border-radius: 5px;
  padding: 10px 15px;
  color: #828282;
  font-size: 16px;
`;

export const DropdownHolder = styled.View`
  border-radius: 5px;
  overflow: hidden;
`;

export const DeliveryTimeInput = styled(Input)`
  width: 80%;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
`;

export const DeliveryTime = styled.View`
  flex-direction: row;
`;

export const MeasureContainer = styled.View`
  background-color: #e0e0e0;
  width: 20%;
  align-items: center;
  justify-content: center;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
`;

export const Measure = styled.Text`
  color: #828282;
`;

export const ButtonTemplate = styled.TouchableOpacity`
  background-color: #59d094;
  width: 100%;
  height: 45px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const Button = styled(ButtonTemplate)`
  margin-top: 30px;
`;

export const ButtonContent = styled.Text`
  color: ${darkblue};
  font-weight: bold;
  font-size: 18px;
`;

export const ImageHolder = styled.View`
  width: 150px;
  height: 150px;
  background: #F5F5F5;
  margin: 20px auto 10px;
  border-radius: 5px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;