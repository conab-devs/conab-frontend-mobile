import styled from 'styled-components/native';
import {darkblue, lightgray} from '../../styles/colors';

export const Label = styled.Text`
  color: ${darkblue};
  font-size: 18px;
  margin-bottom: 5px;
`;

export const Input = styled.TextInput`
  font-size: 16px;
  background-color: ${lightgray};
  border-radius: 6px;
  height: 46px;
  padding: 0 15px;
  color: ${darkblue};
  margin-bottom: 10px;
`;
