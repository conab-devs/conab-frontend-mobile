import React, {useContext, useState, useEffect} from 'react';
import {SearchContainer, Search as S} from './styles';
import {FilterContext} from '../../contexts';
import {useDebounce} from '../../hooks';
import {useNavigation} from '@react-navigation/native';

const Search = ({bottom = 0}) => {
  const navigation = useNavigation();
  const filter = useContext(FilterContext);
  const [searchString, setSearchString] = useState(
    filter.settings.searchString.replace('%20', ' '),
  );

  const debouncedSearchString = useDebounce(
    searchString.replace(' ', '%20'),
    500,
  );

  useEffect(() => {
    if (debouncedSearchString) {
      filter.setSettings({...filter.settings, searchString});
      navigation.navigate('Products', {category: ''});
    }
  }, [debouncedSearchString]);

  return (
    <SearchContainer bottom={bottom}>
      <S
        value={searchString}
        placeholder="O que procura? Leite, biscoito, mel..."
        onChangeText={setSearchString}
      />
    </SearchContainer>
  );
};

export default Search;
