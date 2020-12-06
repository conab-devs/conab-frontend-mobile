import React, {useContext, useEffect, useState, useCallback} from 'react';
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
import Product from './../../components/Product';
import axios from '../../services/api';
import {FilterContext} from '../../contexts';
import {useFocusEffect} from '@react-navigation/native';

const Products = ({navigation, route}) => {
  const filter = useContext(FilterContext);
  const {category} = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState(filter.settings.order);
  const [searchString, setSearchString] = useState(
    filter.settings.searchString,
  );
  const [productName, setProductName] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      if (isLoading) {
        return;
      }

      setIsLoading(true);

      let query = `http://localhost:8000/api/products?page=${page}&category=${category}&min_price=${filter.settings.lowestPrice}&max_price=${filter.settings.greatestPrice}&order=${filter.settings.order}`;
      if (searchString) {
        query += `&name=${searchString}`;
      }

      const {data, status} = await axios.get(query);

      if (status === 200) {
        setProducts((current) => [...current, ...data.data]);
        setPage((current) => current + 1);
        setLastPage(data.last_page);
      }

      setIsLoading(false);
    } catch (error) {
      Alert.alert('Opss, ocorreu um erro.');
    }
  }, [filter.settings, page, isLoading, searchString]);

  useEffect(() => {
    fetchProducts();

    return () => {
      setProducts([]);
      setIsLoading(false);
    };
  }, [filter.settings, searchString]);

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
            if (productName) {
              setPage(1);
              setSearchString(productName.replace(' ', '%20'));
            }
          }}>
          <Icon name="magnify" color="#828282" size={20} />
        </TouchableOpacity>
      </Search>
      <Filter>
        <FilterType>
          {filter.settings.order === 'desc' ? 'Maior Preço' : 'Menor Preço'}
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
        {
          <FlatList
            data={products}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
            onEndReached={() => {
              if (page <= lastPage) {
                fetchProducts();
              }
            }}
            onEndReachedThreshold={0.1}
            ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
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
          />
        }
      </Wrapper>
    </Container>
  );
};

export default Products;
