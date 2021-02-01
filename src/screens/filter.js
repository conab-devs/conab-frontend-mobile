import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {View, Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useSelector, useDispatch} from 'react-redux';

import {allActions} from '../redux/Product';
import Container from '../components/container';
import Input from '../components/input';

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
    <Container style={styles.container}>
      <View>
        <View style={styles.orderingContent}>
          <Text style={styles.title}>Ordenar</Text>
          <View style={styles.radioGroup}>
            <RadioButton
              value={order === 'desc'}
              status={order === 'desc' ? 'checked' : 'unchecked'}
              onPress={() => setOrder('desc')}
              color="black"
            />
            <Text style={styles.label}>Maior Preço</Text>
          </View>
          <View style={styles.radioGroup}>
            <RadioButton
              value={order === 'asc'}
              status={order === 'asc' ? 'checked' : 'unchecked'}
              onPress={() => setOrder('asc')}
              color="black"
            />
            <Text style={styles.label}>Menor Preço</Text>
          </View>
        </View>

        <Text style={styles.title}>Preço</Text>
        <View style={styles.priceGroup}>
            <Input
              label="Preço"
              typeInput="mask"
              style={styles.masked}
              error={errors.price}
              touched={touched.price}
              value={lowestPrice}
              onChangeValue={setLowestPrice}
              unit="R$"
              delimiter=","
              separator="."
              precision={2}
              style={styles.mask}
            />
          />
          <Text>-</Text>
          <Input
              label="Preço"
              typeInput="mask"
              style={styles.masked}
              error={errors.price}
              touched={touched.price}
              value={greatestPrice}
              onChangeValue={setGreatestPrice}
              unit="R$"
              delimiter=","
              separator="."
              precision={2}
              style={styles.mask}
            />
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          let lower =
            typeof lowestPrice === 'string'
              ? lowestPriceRef.getRawValue()
              : lowestPrice;
          let greater =
            typeof greatestPrice === 'string'
              ? greatestPriceRef.getRawValue()
              : greatestPrice;

          dispatch(allActions.setProducts({products: []}));
          dispatch(
            allActions.setFilters({
              greatestPrice: greater,
              lowestPrice: lower,
              order,
            }),
          );
          navigation.goBack();
        }}>
        <Text style={styles.buttonContent}>FILTRAR</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderingContent: {
    marginBottom: '1.2rem',
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  label: {
    fontSize: '1rem',
    marginLeft: '.32rem',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
  },
  buttonContent: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  button: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'black',
    width: '16.6rem',
    height: '2.5rem',
    borderRadius: '1.5rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mask: {
    fontSize: '1rem',
  },
});

export default Filter;
