import React, {useContext, useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {View, Text} from 'react-native';
import {
  Container,
  Title,
  Label,
  RadioGroup,
  PriceGroup,
  OrderingContent,
  Button,
  ButtonContent,
} from './styles';
import {TextInputMask} from 'react-native-masked-text';
import {FilterContext} from '../../contexts';
import {getPrice} from '../../helpers';

const Filter = ({navigation, route}) => {
  const filter = useContext(FilterContext);
  const {categoryId} = route.params;

  const [lowestPrice, setLowestPrice] = useState(filter.settings.lowestPrice);
  const [greatestPrice, setGreatesPrice] = useState(
    filter.settings.greatestPrice,
  );

  return (
    <Container>
      <View>
        <OrderingContent>
          <Title>Ordenar</Title>
          <RadioGroup>
            <RadioButton
              value={filter.settings.order === 'desc'}
              status={
                filter.settings.order === 'desc' ? 'checked' : 'unchecked'
              }
              onPress={() =>
                filter.setSettings({...filter.settings, order: 'desc'})
              }
              color="black"
            />
            <Label>Maior Preço</Label>
          </RadioGroup>
          <RadioGroup>
            <RadioButton
              value={filter.settings.order === 'asc'}
              status={filter.settings.order === 'asc' ? 'checked' : 'unchecked'}
              onPress={() =>
                filter.setSettings({...filter.settings, order: 'asc'})
              }
              color="black"
            />
            <Label>Menor Preço</Label>
          </RadioGroup>
        </OrderingContent>

        <Title>Preço</Title>
        <PriceGroup>
          <TextInputMask
            type={'money'}
            value={lowestPrice}
            onChangeText={(value) => {
              setLowestPrice(getPrice(value));
            }}
          />
          <Text>-</Text>
          <TextInputMask
            type={'money'}
            value={greatestPrice}
            onChangeText={(value) => {
              setGreatesPrice(getPrice(value));
            }}
          />
        </PriceGroup>
      </View>

      <Button
        onPress={() => {
          filter.setSettings({
            ...filter.settings,
            greatestPrice,
            lowestPrice,
          });
          navigation.navigate('Products', {
            category: categoryId,
          });
        }}>
        <ButtonContent>FILTRAR</ButtonContent>
      </Button>
    </Container>
  );
};

export default Filter;
