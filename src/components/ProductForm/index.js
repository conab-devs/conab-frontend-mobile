import React, {useState, useCallback} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  Container,
  Title,
  Label,
  Group,
  DropdownHolder,
  DeliveryTime,
  DeliveryTimeInput,
  MeasureContainer,
  Measure,
  Input,
  Button,
  ButtonContent,
  ImageHolder,
  Image,
} from './styles';
import {TextInputMask} from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import Dropdown from 'react-native-picker-select';

const Form = (props) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(0);
  const [unitOfMeasure, setUnitOfMeasure] = useState('');
  const [price, setPrice] = useState('0');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [productPicture, setProductPicture] = useState('');

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
      <Container>
        <Title>{props.title}</Title>

        <ImageHolder>
          {productPicture ? (
            <Image source={{uri: productPicture.path}} />
          ) : null}
          <Icon
            name="image-edit"
            size={20}
            color="#000000"
            style={styles.icon}
            onPress={handleImagePicking}
          />
        </ImageHolder>

        <Group>
          <Label>Nome</Label>

          <Input
            placeholder="Insira o nome do seu produto..."
            onChangeText={setName}
          />
        </Group>

        <Group>
          <Label>Categoria</Label>

          <DropdownHolder>
            <Dropdown
              placeholder={{
                label: 'Escolha a categoria do produto',
                value: null,
              }}
              onValueChange={setCategory}
              style={stylesDropdown}
              items={props.categories}
            />
          </DropdownHolder>
        </Group>

        <Group>
          <Label>Unidade de Medida</Label>

          <DropdownHolder>
            <Dropdown
              placeholder={{
                label: 'Escolha uma unidade de medida',
                value: null,
              }}
              onValueChange={setUnitOfMeasure}
              style={stylesDropdown}
              items={[
                {label: 'Kg', value: 'kg'},
                {label: 'Unidade', value: 'unit'},
              ]}
            />
          </DropdownHolder>
        </Group>

        <Group>
          <Label>Preço</Label>

          <TextInputMask
            type={'money'}
            value={price}
            style={styles.masked}
            onChangeText={setPrice}
            ref={(ref) => (money = ref)}
          />
        </Group>

        <Group>
          <Label>Tempo de Entrega</Label>

          <DeliveryTime>
            <DeliveryTimeInput
              keyboardType="numeric"
              defaultValue="0"
              value={`${deliveryTime}`}
              onChangeText={(value) => setDeliveryTime(value * 1)}
              placeholder="Insira o tempo de Entrega..."
            />
            <MeasureContainer>
              <Measure>Dias</Measure>
            </MeasureContainer>
          </DeliveryTime>
        </Group>

        <Button>
          <ButtonContent
            onPress={() =>
              props.handleSubmit({
                name,
                category,
                unitOfMeasure,
                price: money.getRawValue(),
                deliveryTime,
                productPicture,
              })
            }>
            {props.buttonDescriptor}
          </ButtonContent>
        </Button>
      </Container>
    </ScrollView>
  );
};

const stylesDropdown = StyleSheet.create({
  inputAndroid: {
    backgroundColor: '#F5F5F5',
    color: '#828282',
  },
  inputIOS: {
    backgroundColor: '#F5F5F5',
    color: '#828282',
  },
});

const styles = StyleSheet.create({
  masked: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  icon: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
});

export default Form;
