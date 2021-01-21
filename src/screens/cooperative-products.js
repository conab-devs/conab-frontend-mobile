import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Container from '../components/container';
import Button from '../components/button';
import Product from '../components/product';
import {allActions} from '../redux/Product';

const CooperativeProducts = ({navigation}) => {
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.product);
  const {cooperative_id} = useSelector(state => state.auth.user);


  useEffect(() => {
    dispatch(allActions.fetchProductsByCooperative({ cooperative: cooperative_id }));
  }, []);

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
        data={products}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        onEndReachedThreshold={0.1}
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
    </Container>
  );
};

export default CooperativeProducts;
