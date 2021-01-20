import React, {useState} from 'react';
import {Alert} from 'react-native';
import {ScrollView, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import Photo from '../components/photo';
import TextInput from '../components/input';
import Button from '../components/button';
import {allActions} from '../redux/Product';
import Container from '../components/container';

const ViewProduct = ({route}) => {
  const {product} = route.params;
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();

  function getPrice(price) {
    return price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  }

  return (
    <Container style={{...styles.container}}>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        <Photo
          productPicture={{path: product.photo_path}}
          height={200}
          width={200}
          editable={false}
        />
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.price}>
            R$ {getPrice(product.price)} /{' '}
            {product.unit_of_measure === 'unit' ? 'Unidade' : 'Kg'}
          </Text>

          <Text style={styles.text}>
            Cooperative: {product.cooperative.name}
          </Text>
          <Text style={styles.text}>
            {product.estimated_delivery_time === 0
              ? 'Não realizamos entrega'
              : `Tempo de entrega: ${product.estimated_delivery_time}`}
          </Text>

          <View style={styles.delimiter} />

          <TextInput
            label="Quantidade"
            placeholder="Insira a quantidade..."
            keyboardType="number-pad"
            defaultValue={`${amount}`}
            onChangeText={setAmount}
          />

          <Button
            type="secondary"
            title="Comprar"
            borderWidth={0}
            onPress={() => {
              if (!Number.isNaN(amount)) {
                const cartProduct = Object.assign({}, product);
                cartProduct.amount = amount;
                dispatch(allActions.pushToCart({product: cartProduct}));
              } else {
                Alert.alert('Escolha uma quantia válida.');
              }
            }}
            style={{
              btn: {
                marginTop: '1.2rem',
              },
            }}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  productName: {
    fontSize: '1.4rem',
    color: '#363D46',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    fontSize: '1rem',
    color: '#363D46',
  },
  wrapper: {
    width: '100%',
  },
  infoContainer: {
    marginTop: '1rem',
    width: '100%',
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#363D46',
    marginBottom: '1rem',
  },
  delimiter: {
    height: 1,
    width: '100%',
    backgroundColor: '#C4C4C4',
    marginTop: '.63rem',
    marginBottom: '.63rem',
    marginLeft: 0,
    marginRight: 0,
  },
});

export default ViewProduct;
