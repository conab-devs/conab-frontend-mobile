import styled, {css} from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';

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

/* Esse TextInputMask está com um warning que já foi corrigido, mas o autor
ainda não criou uma nova versão. Então o jeito é esperar e quando ele fazer
release da versão a gente atualiza. */
export const MaskInput = styled(TextInputMask)`
  ${inputCss}
`;
