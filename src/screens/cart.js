import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import Product from '../components/product';
import Button from '../components/button';
import Container from '../components/container';

const Cart = ({navigation}) => {
  const cart = useSelector((state) => state.product.cart);

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
        data={cart}
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
      <Button type="secondary" title="Finalizar Compra" borderWidth={0} />
    </Container>
  );
};

export default Cart;
