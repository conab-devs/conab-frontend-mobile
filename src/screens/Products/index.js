import React, {useEffect, useState, useCallback} from 'react';
import {TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TextInput,
  Search,
  Filter,
  FilterType,
  Container,
  Wrapper,
  FlatList,
} from './styles';
import Product from '../../components/Product';
import {useSelector, useDispatch} from 'react-redux';
import {allActions} from '../../redux/Product';

const Products = ({navigation, route}) => {
  const {category, searchString: ss} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState(ss);
  const [productName, setProductName] = useState('');
  const dispatch = useDispatch();
  const {lowestPrice, greatestPrice, order} = useSelector(
    (state) => state.product.filters,
  );
  const lastPage = useSelector((state) => state.product.lastPage);

  const {products} = useSelector((state) => state.product);

  const fetchProducts = useCallback(async () => {
    try {
      if (isLoading) {
        return;
      }

      setIsLoading(true);

      dispatch(
        allActions.fetchProducts({
          categoryId: category,
          page,
          greatestPrice,
          lowestPrice,
          order,
          searchString,
          previous: products,
        }),
      );

      setIsLoading(false);
    } catch (error) {
      Alert.alert(error);
    }
  }, [
    page,
    greatestPrice,
    lowestPrice,
    order,
    searchString,
    isLoading,
    products
  ]);

  useEffect(() => {
    fetchProducts();

    return () => {
      setIsLoading(false);
    };
  }, [page, searchString]);

  return (
    <Container>
      <Search>
        <TextInput
          onChangeText={setProductName}
          placeholder="Busque seu produto aqui..."
          placeholderTextColor="#828282"
        />
        <TouchableOpacity
          onPress={() => {
            dispatch(allActions.setProducts({products: [], lastPage}));
            setPage(1);
            setSearchString(productName.replace(' ', '%20'));
          }}>
          <Icon name="magnify" color="#828282" size={20} />
        </TouchableOpacity>
      </Search>
      <Filter>
        <FilterType>
          {order === 'desc' ? 'Maior Preço' : 'Menor Preço'}
        </FilterType>
        <TouchableOpacity>
          <Icon
            name="filter-variant"
            color="#828282"
            size={20}
            onPress={() => {
              setPage(1);
              navigation.navigate('Filter', {categoryId: category});
            }}
          />
        </TouchableOpacity>
      </Filter>
      <Wrapper>
        {<FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          onEndReached={() => {
            if (page < lastPage) {
              setPage((current) => current + 1);
            }
          }}
          onEndReachedThreshold={0.1}
          ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
          // ListHeaderComponent={
          //   <AddProductButton
          //     activeOpacity={0.75}
          //     onPress={() => navigation.navigate('CadastrarProduto')}>
          //     <AddProductContent>Adicionar Produto</AddProductContent>
          //   </AddProductButton>
          // }
          renderItem={({item}) => (
            <Product
              name={item.name}
              cooperativeName={item.cooperative.name}
              price={item.price}
              unitMeasure={item.unit_of_measure}
              imagePath={item.photo_path}
            />
          )}
          keyExtractor={(item) => `${item.id}`}
        />}
      </Wrapper>
    </Container>
  );
};

export default Products;
