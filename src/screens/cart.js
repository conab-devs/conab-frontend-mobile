import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import Product from '../components/product-cart';
import Container from '../components/container';
import {allActions} from '../redux/Product';
import Loading from '../components/loading';

const Cart = ({navigation}) => {
  const [isBasket, setBasket] = useState(true);
  const dispatch = useDispatch();
  const order = useSelector((state) => state.product.order);

  useEffect(() => {
    dispatch(allActions.fetchOrders());
  }, []);
  const styles = getStyles(isBasket);

  if (!!order) {
    return (
      <View style={styles.container}>
        <View style={styles.navigation}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles['block-1']}
            onPress={() => {
              setBasket(true);
            }}>
            <Text style={styles.type}>Cesta Atual</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={styles['block-2']}
            onPress={() => {
              setBasket(false);
            }}>
            <Text style={styles.type}>Histórico</Text>
          </TouchableOpacity>
        </View>
        <Container
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingBottom: '.62rem',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <FlatList
            data={order.carts}
            renderItem={({item}) => (
              <FlatList
                data={item.product_carts}
                renderItem={({item}) => (
                  <Product
                    imagePath={item.product.photo_path}
                    name={item.product.name}
                    price={item.product.price}
                    unitMeasure={item.product.unit_of_measure}
                    amount={item.amount}
                    style={{marginBottom: '.7rem'}}
                  />
                )}
                keyExtractor={(productCart) => productCart.id}
              />
            )}
            keyExtractor={(cart) => cart.id}
          />
        </Container>
      </View>
    );
  } else {
    return <Loading />;
  }
};

const block = {
  height: '3rem',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

const getStyles = (isBasket) =>
  EStyleSheet.create({
    container: {
      flex: 1,
    },
    navigation: {
      flexDirection: 'row',
      backgroundColor: '$lightGray',
    },
    'block-1': {
      ...block,
      borderBottomColor: '$darkBlue',
      borderBottomWidth: isBasket ? 3 : 0,
    },
    'block-2': {
      ...block,
      borderBottomColor: '$darkBlue',
      borderBottomWidth: !isBasket ? 3 : 0,
    },
    type: {
      fontSize: '1.2rem',
    },
  });

export default Cart;
