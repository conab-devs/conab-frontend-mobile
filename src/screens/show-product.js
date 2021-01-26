import React, {useState, useCallback, useEffect} from 'react';
import {Alert} from 'react-native';
import {ScrollView, Text, View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImagePicker from 'react-native-image-crop-picker';

import Photo from '../components/photo';
import Button from '../components/button';
import {allActions} from '../redux/Product';
import Container from '../components/container';
import {createFormData} from '../helpers';

const ShowProduct = ({route}) => {
  const dispatch = useDispatch();
  const {product} = useSelector((state) => state.product);
  const [picture, setPicture] = useState(null);

  function getPrice(price) {
    return price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  }

  useEffect(() => {
    return () => {
      dispatch(allActions.setProduct({product: null}));
    };
  }, []);

  const handleImagePicking = useCallback(() => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then((image) => {
        setPicture(image.path);
        const form = createFormData(image, {_method: 'PUT'});
        dispatch(
          allActions.updateProductPicture({product: form, id: product.id}),
        );
        dispatch(allActions.getProduct({id: product.id}));
      })
      .catch((err) => {
        if (err.message.includes('User cancelled image selection')) {
          return;
        }
        Alert.alert(
          'Ops, um erro ocorreu durante a seleção da image, tente novamente.',
        );
      });
  }, [product]);
  if (product) {
    return (
      <Container style={{...styles.container}}>
        <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
          <View>
            <Photo
              productPicture={(() => {
                if (!picture && product) {
                  setPicture(product.photo_path);
                }
                return {path: picture};
              })()}
              height={200}
              width={200}
              handleImagePicking={handleImagePicking}
            />
            <Text style={styles.productName}>{product.name}</Text>
          </View>

          <View style={styles.content}>
            <View>
              <InfoDisplayer label="Nome do Produto" content={product.name} />

              <InfoDisplayer
                label="Categoria"
                content={product.category.name}
              />

              {product.estimated_delivery_time > 0 ? (
                <InfoDisplayer
                  label="Tempo de Entrega"
                  content={`${product.estimated_delivery_time} Dias`}
                />
              ) : null}

              <InfoDisplayer
                label="Preço"
                content={`R$ ${getPrice(product.price)} - ${
                  product.unit_of_measure === 'kg' ? 'Kg' : 'Unidade'
                }`}
              />
            </View>
            <View style={styles.buttons}>
              <Button type="primary" title="Atualizar" size="medium" />
              <Button type="danger" title="Excluir" size="medium" />
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  } else {
    return (
      <Container style={styles.container}>
        <ActivityIndicator size="small" color={styles.green.color} />
      </Container>
    );
  }
};

function InfoDisplayer({label, content}) {
  return (
    <View style={styles.infoGroup}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.info}>{content}</Text>
    </View>
  );
}

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
  wrapper: {
    width: '100%',
  },
  infoGroup: {
    marginTop: '.9rem',
  },
  infoLabel: {
    fontSize: '1rem',
  },
  info: {
    fontSize: '1.25rem',
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: '3rem',
  },
  green: {
    color: '$green',
  },
});

export default ShowProduct;
