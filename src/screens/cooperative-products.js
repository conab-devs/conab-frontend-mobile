import React, {useEffect, useState, useCallback} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import Container from '../components/container';
import Product from '../components/product';
import {allActions} from '../redux/Product';
import Button from '../components/button';

const CooperativeProducts = ({navigation}) => {
  const dispatch = useDispatch();
  const {cooperativeProducts} = useSelector((state) => state.product);
  const {cooperative_id} = useSelector((state) => state.auth.user);
  const [page, setPage] = useState(1);
  const lastPage = useSelector((state) => state.product.lastPage);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatchGetProduct = (item) => {
    return new Promise((resolve, reject) => {
      try {
        dispatch(allActions.getProduct({id: item.id}));
        resolve();
      } catch (err) {
        reject();
      }
    });
  };

  const fetchProducts = useCallback(() => {
    dispatch(
      allActions.fetchProductsByCooperative({
        cooperative: cooperative_id,
        page: page,
        previous: cooperativeProducts,
      }),
    );
  }, [cooperative_id, page, cooperativeProducts]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);

    setPage(1);
    dispatch(allActions.setCooperativeProducts({products: []}));
    fetchProducts();

    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    if (page === 1) {
      dispatch(allActions.setCooperativeProducts({products: []}));
    }
    fetchProducts();
  }, [page]);

  return (
    <Container
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: '1.5rem',
        paddingBottom: '.62rem',
        alignItems: 'flex-start',
      }}>
      <FlatList
        style={styles.flatList}
        data={cooperativeProducts}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        onEndReachedThreshold={0.1}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        onEndReached={() => {
          if (page < lastPage) {
            setPage((current) => current + 1);
          }
        }}
        ListHeaderComponent={
          <Button
            title="Adicionar Produto"
            type="primary"
            size="small"
            activeOpacity={0.75}
            style={{
              btn: {
                marginLeft: 0,
              }
            }}
            onPress={() => navigation.navigate('RegisterProduct')} />
        }
        renderItem={({item}) => (
          <Product
            name={item.name}
            cooperativeName={item.cooperative.name}
            price={item.price}
            unitMeasure={item.unit_of_measure}
            imagePath={item.photo_path}
            handlePress={() => {
              dispatchGetProduct(item);
              navigation.navigate('ShowProduct');
            }}
          />
        )}
        keyExtractor={(item) => `${item.id}`}
      />
    </Container>
  );
};

const styles = EStyleSheet.create({
  flatList: {
    width: '100%',
  },
});

export default CooperativeProducts;
