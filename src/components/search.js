import React, {useState, useEffect} from 'react';
import {View, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDebounce} from '../hooks';
import {allActions} from '../redux/Product';

const Search = ({bottom = 0}) => {
  const navigation = useNavigation();
  const [product, setProduct] = useState('');
  const dispatch = useDispatch();

  const styles = getStyles(bottom);
  const debouncedSearchString = useDebounce(product.replace(' ', '%20'), 1300);

  useEffect(() => {
    if (debouncedSearchString) {
      dispatch(allActions.setProducts({products: [], lastPage: 1}));
      console.log(product);
      navigation.navigate('Products', {
        category: '',
        searchString: product,
      });
    }
  }, [debouncedSearchString]);

  return (
    <View bottom={bottom} style={styles.container}>
      <TextInput
        style={styles.search}
        value={product}
        placeholder="O que procura? Leite, biscoito, mel..."
        onChangeText={setProduct}
      />
    </View>
  );
};

const getStyles = (bottom) => {
  return EStyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    search: {
      backgroundColor: 'white',
      width: 262,
      borderRadius: 6,
      paddingLeft: 13,
      paddingRight: 13,
      paddingTop: 0,
      paddingBottom: 0,
      height: 30,
    },
  });
};

export default Search;
