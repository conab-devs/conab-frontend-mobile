import styled, {css} from 'styled-components/native';
import {darkblue, green} from '../../styles/colors';

export const Btn = styled.TouchableOpacity`
  border-radius: 6px;
  margin: 5px auto;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 46px;

  ${({type}) => {
    return type === 'primary'
      ? css`
          background-color: ${darkblue};
        `
      : css`
          background-color: ${green};
          border-width: 2px;
        `;
  }}
`;

export const BtnText = styled.Text`
  color: white;
  font-size: 24px;
  color: ${({type}) => (type === 'primary' ? 'white' : darkblue)};
`;
