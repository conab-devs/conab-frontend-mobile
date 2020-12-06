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

const Filter = ({navigation}) => {
  const filter = useContext(FilterContext);

  const [lowestPrice, setLowestPrice] = useState(filter.settings.lowestPrice);
  const [greatestPrice, setGreatesPrice] = useState(
    filter.settings.greatestPrice,
  );
  const [order, setOrder] = useState(filter.settings.order);

  return (
    <Container>
      <View>
        <OrderingContent>
          <Title>Ordenar</Title>
          <RadioGroup>
            <RadioButton
              value={order === 'desc'}
              status={order === 'desc' ? 'checked' : 'unchecked'}
              onPress={() => setOrder('desc')}
              color="black"
            />
            <Label>Maior Preço</Label>
          </RadioGroup>
          <RadioGroup>
            <RadioButton
              value={order === 'asc'}
              status={order === 'asc' ? 'checked' : 'unchecked'}
              onPress={() => setOrder('asc')}
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
            order,
          });
          navigation.goBack();
        }}>
        <ButtonContent>FILTRAR</ButtonContent>
      </Button>
    </Container>
  );
};

export default Filter;
