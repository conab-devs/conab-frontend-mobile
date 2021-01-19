import React, {useState, useCallback} from 'react';
import {ScrollView, Text, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Photo from './photo';
import EStyleSheet from 'react-native-extended-stylesheet';
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
        // TODO: Check how to handle that kind of error
        return;
      });
  }, []);

  return (
    <ScrollView>
      <Container style={{backgroundColor: 'white'}}>
        <Text style={styles.title}>{props.title}</Text>

        <Photo
          productPicture={productPicture}
          handleImagePicking={handleImagePicking}
        />

        <View style={styles.group}>
          <Input
            label="Nome"
            placeholder="Insira o nome do seu produto..."
            onChangeText={setName}
          />
        </View>

        <View style={styles.group}>
          <DropdownInput
            label="Categoria"
            placeholder="Escolha a categoria do produto"
            onValueChange={setCategory}
            items={props.categories}
          />
        </View>

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
        </View>

        <View style={styles.group}>
          <Input
            label="Preço"
            typeInput="mask"
            type={'money'}
            value={price}
            style={styles.masked}
            onChangeText={setPrice}
            ref={(ref) => (money = ref)}
          />
        </View>

        <View style={styles.group}>
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
        </View>

        <Button
          onPress={() => {
            if (isMakingRequest) {
              return;
            }

            setIsMakingRequest(true);

            props.handleSubmit({
              name,
              category,
              unitOfMeasure,
              price: money.getRawValue(),
              deliveryTime,
              productPicture,
            });
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
