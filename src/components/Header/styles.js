import styled from 'styled-components';

export const Items = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

export const SearchContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${(props) => (props.bottom ? props.bottom : 0)}px;
  justify-content: flex-end;
  align-items: center;
`;

export const Search = styled.TextInput`
  background-color: white;
  width: 300px;
  border-radius: 6px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0px;
  padding-bottom: 0px;
  height: 35px;
`;
