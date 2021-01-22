import React, {useState, useCallback} from 'react';
import {Alert} from 'react-native';
import {ScrollView, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImagePicker from 'react-native-image-crop-picker';

import Photo from '../components/photo';
import TextInput from '../components/input';
import Button from '../components/button';
import {allActions} from '../redux/Product';
import Container from '../components/container';
import {createFormData} from '../helpers';

const ShowProduct = ({route}) => {
  const {product} = route.params;
  const [amount, setAmount] = useState(1);
  const [productPicture, setProductPicture] = useState(product.photo_path);
  const dispatch = useDispatch();

  function getPrice(price) {
    return price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  }

  const handleImagePicking = useCallback(() => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then((image) => {
        if (image.path) {
          setProductPicture(image.path);
        }
        const form = createFormData(image);
        dispatch(allActions.updateProductPicture({ product: form, id: product.id }));
      })
      .catch((err) => {
        if (err.message.includes('User cancelled image selection')) {
          return;
        }
        Alert.alert('Ops, um erro ocorreu durante a seleção da image, tente novamente.');
      });
  }, []);

  return (
    <Container style={{...styles.container}}>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        <Photo
          productPicture={{path: productPicture}}
          height={200}
          width={200}
          handleImagePicking={handleImagePicking}
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

export default ShowProduct;
