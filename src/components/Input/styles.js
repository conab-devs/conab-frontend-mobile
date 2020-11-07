import styled, {css} from 'styled-components/native';
import {TextInputMask} from 'react-native-masked-text';

import {darkblue, lightgray} from '../../styles/colors';

export const Label = styled.Text`
  color: ${darkblue};
  font-size: 18px;
  margin-bottom: 5px;
`;

const inputCss = css`
  font-size: 16px;
  background-color: ${lightgray};
  border-radius: 6px;
  height: 46px;
  padding: 0 15px;
  color: ${darkblue};
  margin-bottom: 10px;
`;

export const NormalInput = styled.TextInput`
  ${inputCss}
`;

export const MaskInput = styled(TextInputMask)`
  ${inputCss}
`;
