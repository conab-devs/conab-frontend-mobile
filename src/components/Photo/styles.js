import styled from 'styled-components/native';

export const ImageHolder = styled.View`
  width: ${props => props.width ? `${props.width}px` : '150px'};
  height: ${props => props.height ? `${props.height}px` : '150px'};
  background: #f5f5f5;
  margin: 20px auto 10px;
  border-radius: 5px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;
