import React from 'react';
import {SearchContainer, Search as S} from './styles';

const Search = ({bottom = 0}) => (
  <SearchContainer bottom={bottom}>
    <S placeholder="O que procura? Leite, biscoito, mel..." />
  </SearchContainer>
);

export default Search;
