import React, {useState} from 'react';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import Product from '../components/product-cart';
import Button from '../components/button';
import Container from '../components/container';

const Cart = ({navigation}) => {
  const cart = useSelector((state) => state.product.cart);
  const [isBasket, setBasket] = useState(true);

  const styles = getStyles(isBasket);

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
          <TouchableOpacity activeOpacity={1} style={styles['block-1']} onPress={() => {
            setBasket(true);
            console.log(isBasket);
          }}>
            <Text style={styles.type}>Cesta Atual</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1} style={styles['block-2']} onPress={() => {
            setBasket(false);
            console.log(isBasket);
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
        <Product
              name={'Frutas'}
              cooperativeName={'Amanhã'}
              price={1.2}
              unitMeasure={'unit'}
              imagePath={'https://olhonopreco.com.br/media/1850-maca-fugi-kg-md.jpg'}
              handlePress={() => {
                
              }}
            />
        {/*<FlatList
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
        <Button type="secondary" title="Finalizar Compra" borderWidth={0} />*/}
        
      </Container>
    </View>
  );
};
const block = {
  height: '3rem',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

const getStyles = (isBasket) => (
  EStyleSheet.create({
    container: {
      flex: 1,
    },
    navigation: {
      flexDirection: 'row',
      backgroundColor: '$lightGray'
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
      fontSize: '1.2rem'
    },
  })
);

export default Cart;
