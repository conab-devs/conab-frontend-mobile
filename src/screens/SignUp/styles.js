import styled from 'styled-components/native';
import {lightgray} from '../../styles/colors';

import {Container as C} from '../../styles/utils';

export const Container = styled(C)`
  background-color: white;
  justify-content: center;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {paddingTop: 20, paddingBottom: 20},
})`
  margin-top: 20px;
  width: 100%;
`;

export const Upload = styled.TouchableOpacity`
  align-self: center;
  height: 100px;
  width: 100px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: ${lightgray};
  margin-bottom: 20px;
  overflow: hidden;
`;

export const UploadImage = styled.Image`
  width: 100%;
  height: 100%;
`;
