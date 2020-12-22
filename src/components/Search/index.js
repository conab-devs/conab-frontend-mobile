import React, {useContext, useState, useEffect} from 'react';
import {SearchContainer, Search as S} from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {useDebounce} from '../../hooks';
import {useNavigation} from '@react-navigation/native';
import {allActions} from '../../redux/Product';

const Search = ({bottom = 0}) => {
  const navigation = useNavigation();
  const [product, setProduct] = useState('');
  const dispatch = useDispatch();

  const debouncedSearchString = useDebounce(
    product.replace(' ', '%20'),
    1300,
  );

  useEffect(() => {
    if (debouncedSearchString) {
      dispatch(allActions.setProducts({products: [], lastPage: 1}));
      console.log(product);
      navigation.navigate('Products', {
        category: '', searchString: product
      });
    }
  }, [debouncedSearchString]);

  return (
    <SearchContainer bottom={bottom}>
      <S
        value={product}
        placeholder="O que procura? Leite, biscoito, mel..."
        onChangeText={setProduct}
      />
    </SearchContainer>
  );
};

export default Search;
