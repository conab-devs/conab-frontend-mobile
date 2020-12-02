import React, {useState, useEffect, useCallback} from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput, Search, Filter, FilterType, Container, Wrapper, FlatList} from './styles';
import {useSelector} from 'react-redux';
import Product from './../../components/Product';
import axios from '../../services/api';

const Products = () => {
  const route = useRoute();
  const {category} = route.params;
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    const { data, status } = await axios.get(`/products?page=${nextPage}&category_id=${category}`);
    
    if (status === 200) {
      setProducts([...products, ...data.data]);
      setNextPage(current => current + 1);
    }

    setIsLoading(false);
  }, [nextPage]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <Search>
        <TextInput
          placeholder="Busque seu produto aqui..."
          placeholderTextColor="#828282"
        />
        <TouchableOpacity>
          <Icon name="magnify" color="#828282" size={20} />
        </TouchableOpacity>
      </Search>
      <Filter>
        <FilterType>Menor Preço</FilterType>
        <TouchableOpacity>
          <Icon name="filter-variant" color="#828282" size={20} />
        </TouchableOpacity>
      </Filter>
      <Wrapper>
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          onEndReached={() => fetchProducts()}
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
      </Wrapper>
    </Container>
  );
};

export default Products;
