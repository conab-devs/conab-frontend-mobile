import styled from 'styled-components/native';
import {darkblue} from '../../styles/colors';

export const TBContainer = styled.View`
  flex-direction: row;
  background-color: ${darkblue};
`;

export const TBButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

export const TBButtonText = styled.Text`
  color: ${(props) => props.color};
  font-weight: bold;
`;
