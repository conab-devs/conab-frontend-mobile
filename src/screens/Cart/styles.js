import styled from 'styled-components/native';
import {Container as C} from '../../styles/utils';

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const Wrapper = styled(C)`
  background-color: transparent;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 10px;
  padding-bottom: 10px;
`;
