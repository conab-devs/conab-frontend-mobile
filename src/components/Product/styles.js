import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  height: 80px;
  margin-bottom: 10px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 6px;
`;

export const ImageContainer = styled.View`
  height: 80px;
  width: 80px;
`;

export const Content = styled.View`
  height: 100%;
  margin-left: 15px;
  justify-content: space-around;
`;

export const Emphatized = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #363d46;
`;

export const CooperativeName = styled.Text`
  font-size: 12px;
  color: #363d46;
`;
