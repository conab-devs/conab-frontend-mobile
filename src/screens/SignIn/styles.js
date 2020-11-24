import styled from 'styled-components/native';
import {darkblue} from '../../styles/colors';

export const Title = styled.Text`
  width: 100%;
  font-size: 38px;
  color: ${darkblue};
  margin-bottom: 10px;
`;

export const Bold = styled.Text`
  font-weight: bold;
`;

export const Form = styled.View`
  width: 100%;
  justify-content: space-between;
`;

export const Inputs = styled.View`
  margin-bottom: 40px;
`;

export const ForgotPassword = styled.Text`
  align-self: flex-end;
  font-size: 16px;
  text-decoration: underline;
  color: ${darkblue};
`;
