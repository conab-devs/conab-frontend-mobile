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
  Image
} from './styles';
import Dropdown from 'react-native-picker-select';
import {darkblue} from './../../styles/colors';
import {TextInputMask} from 'react-native-masked-text';
import {setProduct} from '../../redux/Product';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState({});
  const [unitOfMeasure, setUnitOfMeasure] = useState({});
  const [price, setPrice] = useState(0);
  const [availability, setAvailability] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState('0');
  const [productPicture, setProductPicture] = useState('');
  const dispatch = useDispatch();

  const handleImagePicking = useCallback(async () => {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    });

    if (image.path) {
      setProductPicture(image);
    }
  }, []);

  return (
    <ScrollView>
      <Container>
        <Title>Adicionar Produto</Title>
        
        <ImageHolder>
          {productPicture ? <Image source={{uri: productPicture.path}} /> : null}
          <Icon name="image-edit" size={20} color="#000000" style={{
            position: 'absolute',
            right: 15,
            bottom: 15,
          }} onPress={handleImagePicking} />
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
              onValueChange={(value) => setCategory(value)}
              style={stylesDropdown}
              items={[
                {label: 'Processados', value: 1},
                {label: 'Frutas', value: 2},
              ]}
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
              onValueChange={(value) => setCategory(value)}
              style={stylesDropdown}
              items={[
                {label: 'Kg', value: 1},
                {label: 'Unidade', value: 2},
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
          />
        </Group>

        <Group>
          <Label>Tempo de Entrega</Label>

          <DeliveryTime>
            <DeliveryTimeInput
              keyboardType="numeric"
              defaultValue="0"
              value={deliveryTime}
              onChangeText={setDeliveryTime}
              placeholder="Insira o tempo de Entrega..."
            />
            <MeasureContainer>
              <Measure>Dias</Measure>
            </MeasureContainer>
          </DeliveryTime>
        </Group>

        <Button>
          <ButtonContent
            onPress={() => {
              dispatch(
                createProduct({
                  name,
                  price,
                }),
              );
            }}>
            Adicionar
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
});

export default CreateProduct;
