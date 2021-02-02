import React, {useEffect, useState, useCallback} from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
  FlatList,
  TextInput,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import Product from '../components/product';
import {allActions} from '../redux/Product';
import Container from '../components/container';
import Button from '../components/button';


const Products = ({navigation, route}) => {
  const {category, searchString: ss} = route.params;

  const [isRefreshing, setIsRefreshing] = useState(false);

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
  
  const fetchProducts = useCallback(() => {
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
  }, [
    page,
    greatestPrice,
    lowestPrice,
    order,
    searchString,
    isLoading,
    products,
  ]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);

    dispatch(allActions.setProducts({products: []}));
    fetchProducts();

    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    fetchProducts();

    return () => {
      setIsLoading(false);
    };
  }, [page, searchString, greatestPrice, lowestPrice, order]);

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.textInput}
          onChangeText={setProductName}
          placeholder="Busque seu produto aqui..."
          placeholderTextColor="#828282"
        />
        <TouchableOpacity
          onPress={() => {
            dispatch(allActions.setProducts({products: []}));
            setPage(1);
            setSearchString(productName.replace(' ', '%20'));
          }}>
          <Icon name="magnify" color="#828282" size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.filter}>
        <Text style={styles.filterType}>
          {order === 'desc' ? 'Maior Preço' : 'Menor Preço'}
        </Text>
        <TouchableOpacity>
          <Icon
            name="filter-variant"
            color="#828282"
            size={20}
            onPress={() => {
              // dispatch(allActions.setProducts({products: []}));
              setPage(1);
              navigation.navigate('Filter', {categoryId: category});
            }}
          />
        </TouchableOpacity>
      </View>
      <Container style={styles.wrapper}>
        {
          <FlatList
            style={styles.flatList}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
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
            renderItem={({item}) => (
              <Product
                name={item.name}
                cooperativeName={item.cooperative.name}
                price={item.price}
                unitMeasure={item.unit_of_measure}
                imagePath={item.photo_path}
                handlePress={() => {
                  navigation.navigate('ViewProduct', {product: item});
                }}
              />
            )}
            keyExtractor={(item) => `${item.id}`}
          />
        }
      </Container>
    </View>
  );
};

const styles = EStyleSheet.create({
  flatList: {
    width: '100%',
  },
  textInput: {
    backgroundColor: 'white',
    width: '80%',
    height: '100%',
    color: '#828282',
    fontSize: '.9rem',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
    height: '2.8rem',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: '1.2rem',
    paddingRight: '1.2rem',
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    width: '100%',
    height: '2.8rem',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: '1.2rem',
    paddingRight: '1.2rem',
  },
  filterType: {
    fontSize: '.75rem',
    color: '#828282',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: '0.62rem',
    paddingBottom: '0.62rem',
  },
  addProductButton: {
    backgroundColor: '$darkBlue',
    maxWidth: '40%',
    borderRadius: 5,
    height: '2rem',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0.62rem',
    marginBottom: '0.62rem',
    marginRight: 0,
    marginLeft: 0,
    elevation: 3,
  },
  white: {
    color: 'white',
    fontSize: '.85rem',
  },
});

export default Products;
