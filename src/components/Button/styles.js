import styled, {css} from 'styled-components/native';
import {darkblue, green} from '../../styles/colors';

export const Btn = styled.TouchableOpacity`
  border-radius: 6px;
  margin: 5px auto;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${darkblue};
  height: 46px;
  padding: 2px;
`;

export const BtnText = styled.Text`
  color: white;
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: 44px;
  border-radius: 3px;
  font-size: 24px;

  ${({type}) => {
    return type === 'primary'
      ? css`
          background-color: transparent;
          color: white;
        `
      : css`
          background-color: ${green};
          color: ${darkblue};
        `;
  }}
`;
