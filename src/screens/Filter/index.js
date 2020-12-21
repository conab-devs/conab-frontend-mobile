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
import {allActions} from '../../redux/Product';
import {useSelector, useDispatch} from 'react-redux';

const Filter = ({navigation}) => {
  const dispatch = useDispatch();
  const {lowestPrice: lp, greatestPrice: gp, order: ord} = useSelector(
    (state) => state.product.filters,
  );
  const [lowestPrice, setLowestPrice] = useState(lp);
  const [greatestPrice, setGreatestPrice] = useState(gp);
  const [order, setOrder] = useState(ord);
  
  let lowestPriceRef;
  let greatestPriceRef;

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
            onChangeText={setLowestPrice}
            ref={(ref) => (lowestPriceRef = ref)}
          />
          <Text>-</Text>
          <TextInputMask
            type={'money'}
            value={greatestPrice}
            onChangeText={setGreatestPrice}
            ref={(ref) => (greatestPriceRef = ref)}
          />
        </PriceGroup>
      </View>

      <Button

        onPress={() => {
          let lower = typeof lowestPrice === 'string' ? lowestPriceRef.getRawValue() : lowestPrice;
          let greater = typeof greatestPrice === 'string' ? greatestPriceRef.getRawValue() : greatestPrice;

          dispatch(allActions.setProducts({products: []}));
          dispatch(allActions.setFilters({
            greatestPrice: greater, 
            lowestPrice: lower, 
            order
          }));
          navigation.goBack();
        }}>
        <ButtonContent>FILTRAR</ButtonContent>
      </Button>
    </Container>
  );
};

export default Filter;
