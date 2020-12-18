import React, {useState} from 'react';
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
import {getPrice} from '../../helpers';
import {allActions} from '../../redux/Product';
import {useSelector, useDispatch} from 'react-redux';

const Filter = ({navigation}) => {
  const dispatch = useDispatch();
  const {lowestPrice: lp, greatestPrice: gp, order: ord} = useSelector(
    (state) => state.product.filters,
  );
  const [lowestPrice, setLowestPrice] = useState(lp);
  const [greatestPrice, setGreatesPrice] = useState(gp);
  const [order, setOrder] = useState(ord);

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
          dispatch(allActions.setProducts({products: []}));
          dispatch(allActions.setFilters({greatestPrice, lowestPrice, order}));
          navigation.goBack();
        }}>
        <ButtonContent>FILTRAR</ButtonContent>
      </Button>
    </Container>
  );
};

export default Filter;
