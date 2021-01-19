import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {View, Text, TouchableOpacity} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import EStyleSheet from 'react-native-extended-stylesheet';
import {allActions} from '../redux/Product';
import {useSelector, useDispatch} from 'react-redux';
import Container from '../components/container';

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
          <TextInputMask
            type={'money'}
            value={lowestPrice}
            onChangeText={setLowestPrice}
            ref={(ref) => (lowestPriceRef = ref)}
            style={styles.mask}
          />
          <Text>-</Text>
          <TextInputMask
            type={'money'}
            value={greatestPrice}
            onChangeText={setGreatestPrice}
            ref={(ref) => (greatestPriceRef = ref)}
            style={styles.mask}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
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
    fontSize: '1rem'
  }
});

export default Filter;
