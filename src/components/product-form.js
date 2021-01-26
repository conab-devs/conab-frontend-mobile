import React, {useState, useCallback} from 'react';
import {ScrollView, Text, View, Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import EStyleSheet from 'react-native-extended-stylesheet';

import Photo from './photo';
import Container from './container';
import Input from './input';
import DropdownInput from './dropdown-input';
import Button from './button';

const Form = (props) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(0);
  const [unitOfMeasure, setUnitOfMeasure] = useState('');
  const [price, setPrice] = useState('0');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [productPicture, setProductPicture] = useState('');
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [availability, setAvailability] = useState(true);

  let money = null;

  const handleImagePicking = useCallback(() => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then((image) => {
        if (image.path) {
          setProductPicture(image);
        }
      })
      .catch((err) => {
        if (err.message.includes('User cancelled image selection')) {
          return;
        }
        Alert.alert('Ops, um erro ocorreu durante a seleção da image, tente novamente.');
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={{ 
      flex: 1, 
    }}>
      <Container style={{
        backgroundColor: 'white', 
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
        {props.titleShown ? <Text style={styles.title}>{props.title}</Text> : null}

        {props.photoShown ? <Photo
          productPicture={productPicture}
          handleImagePicking={handleImagePicking}
        /> : null
        }

        {props.nameShown ? <View style={styles.group}>
          <Input
            label="Nome"
            placeholder="Insira o nome do seu produto..."
            onChangeText={setName}
          />
        </View> : null}

        {props.categoryShown ?
        <View style={styles.group}>
          <DropdownInput
            label="Categoria"
            placeholder="Escolha a categoria do produto"
            onValueChange={setCategory}
            items={props.categories}
          />
        </View> : null}

        {props.unitOfMeasure ?
        <View style={styles.group}>
          <DropdownInput
            label="Unidade de Medida"
            placeholder="Escolha uma unidade de medida"
            onValueChange={setUnitOfMeasure}
            items={[
              {label: 'Kg', value: 'kg'},
              {label: 'Unidade', value: 'unit'},
            ]}
          />
        </View> : null}

        {props.availabilityShown ?
        <View style={styles.group}>
          <DropdownInput
            label="Disponibilidade"
            placeholder="Disponibilidade do produto"
            onValueChange={setAvailability}
            items={[
              {label: 'Disponível', value: true},
              {label: 'Indisponível', value: false},
            ]}
          />
        </View> : null}

        {props.priceShown ? <View style={styles.group}>
          <Input
            label="Preço"
            typeInput="mask"
            type={'money'}
            value={price}
            style={styles.masked}
            onChangeText={setPrice}
            ref={(ref) => (money = ref)}
          />
        </View> : null}

        {props.estimatedDeliveryTimeShown ? <View style={styles.group}>
          <Text style={styles.label}>Tempo de Entrega</Text>

          <View style={styles.deliveryTime}>
            <Input
              style={{
                mask: {
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                  width: '80%',
                },
              }}
              keyboardType="numeric"
              defaultValue="0"
              value={`${deliveryTime}`}
              onChangeText={(value) => setDeliveryTime(value * 1)}
              placeholder="Insira o tempo de Entrega..."
            />
            <View style={styles.measureContainer}>
              <Text style={styles.measure}>Dias</Text>
            </View>
          </View>
        </View> : null}

        <Button
          onPress={() => {
            if (isMakingRequest) {
              return;
            }

            setIsMakingRequest(true);

            const body = {};
            (name && props.nameShown) ? (body.name = name) : null;
            (category && props.categoryShown) ? (body.category = category) : null;
            (unitOfMeasure && props.unitOfMeasureShown) ? (body.unitOfMeasure = unitOfMeasure) : null;
            (money.getRawValue() > 0 && props.priceShown) ? (body.price = money.getRawValue()) : null;
            (deliveryTime && props.deliveryTimeShown) ? (body.deliveryTime = deliveryTime) : null;
            (productPicture && props.productPictureShown) ? (body.productPicture = productPicture) : null;
            (availability && props.availabilityShown) ? (body.availability = availability) : null;

            props.handleSubmit(body);
          }}
          disabled={isMakingRequest}
          type="submit"
          title={props.buttonDescriptor}
          style={{
            btn: {
              marginTop: '2rem',
            },
          }}
        />
      </Container>
    </ScrollView>
  );
};

Form.defaultProps = {
  titleShown: true,
  photoShown: true,
  nameShown: true,
  categoryShown: true,
  priceShown: true,
  unitOfMeasureShown: true,
  estimatedDeliveryTimeShown: true,
  availabilityShown: false
};

const styles = EStyleSheet.create({
  masked: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '0.63rem',
  },
  deliveryTime: {
    flexDirection: 'row',
    height: '2.87rem',
  },
  measureContainer: {
    backgroundColor: '#e0e0e0',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  label: {
    fontSize: '1rem',
    color: '$darkBlue',
    marginBottom: '.32rem',
  },
  measure: {
    fontSize: '1rem',
    color: '#828282',
  },
  group: {
    marginTop: '1rem',
    width: '100%',
  },
});

const stylesDropdown = EStyleSheet.create({
  inputAndroid: {
    backgroundColor: '#F5F5F5',
    color: '#828282',
  },
  inputIOS: {
    backgroundColor: '#F5F5F5',
    color: '#828282',
  },
});

export default Form;
