import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Formik} from 'formik';

import {allActions} from '../redux/Product';
import Input from '../components/input';
import DropdownInput from '../components/dropdown-input';
import Button from '../components/button';
import LabeledInput from '../components/labeled-input';
import UpdateProductSchema from '../schema/update-product';

const CreateProduct = ({navigation, route}) => {
  const {id} = route.params;
  const {categories} = useSelector((state) => state.product);
  const {cooperative_id} = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [isMakingRequest, setIsMakingRequest] = useState(false);

  const submit = useCallback(
    (fields) => {
      if (isMakingRequest) {
        return;
      }

      setIsMakingRequest(true);

      dispatch(allActions.updateProduct({product: fields}));
      dispatch(
        allActions.fetchProductsByCooperative({
          cooperative: cooperative_id,
          page: 1,
          previous: [],
        }),
      );

      setIsMakingRequest(false);
      navigation.goBack();
    },
    [navigation, dispatch, cooperative_id],
  );

  const getCategories = useCallback(() => {
    return categories.map((category) => ({
      label: category.name,
      value: `${category.id}`,
    }));
  }, [categories]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <Text style={styles.title}>Atualizar Produto</Text>

      <Formik
        initialValues={{
          id,
          name: '',
          category_id: '',
          unit_of_measure: '',
          price: '',
          estimated_delivery_time: '',
          availability: '',
        }}
        validationSchema={UpdateProductSchema}
        onSubmit={(values) => {
          Object.keys(values).forEach((key) => {
            if (values[key] === '') {
              delete values[key];
            }
          });
          submit(values);
        }}>
        {({handleChange, _, handleSubmit, values, errors, touched}) => (
          <>
            <View style={styles.group}>
              <Input
                label="Nome"
                placeholder="Insira o nome do seu produto"
                onChangeText={handleChange('name')}
                value={values.name}
                error={errors.name}
                touched={touched.name}
              />
            </View>

            <View style={styles.group}>
              <DropdownInput
                label="Categoria"
                placeholder="Escolha a categoria do produto"
                onValueChange={handleChange('category_id')}
                items={getCategories()}
                error={errors.category_id}
                touched={touched.category_id}
              />
            </View>

            <View style={styles.group}>
              <DropdownInput
                label="Disponibilidade"
                placeholder="Disponibilidade do produto"
                onValueChange={handleChange('availability')}
                items={[
                  {label: 'Disponível', value: 'true'},
                  {label: 'Indisponível', value: 'false'},
                ]}
                error={errors.availability}
                touched={touched.availability}
              />
            </View>

            <View style={styles.group}>
              <Input
                label="Preço"
                typeInput="mask"
                style={styles.masked}
                error={errors.price}
                touched={touched.price}
                value={values.price}
                onChangeValue={(value) => handleChange('price')(`${value}`)}
                unit="R$"
                delimiter=","
                separator="."
                precision={2}
                placeholder="Escolha o preço"
              />
            </View>

            <View style={styles.group}>
              <LabeledInput
                label="Tempo de Entrega"
                keyboardType="numeric"
                value={values.estimated_delivery_time}
                onChangeText={handleChange('estimated_delivery_time')}
                placeholder="Insira o tempo de Entrega..."
                inputLabel="Dias"
                error={errors.estimated_delivery_time}
                touched={touched.estimated_delivery_time}
              />
            </View>

            <Button
              onPress={handleSubmit}
              disabled={isMakingRequest}
              type="submit"
              title="Atualizar"
              style={{
                btn: {
                  marginTop: '2rem',
                },
              }}
            />
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: '1.87rem',
    paddingBottom: '1.87rem',
    paddingLeft: '1.25rem',
    paddingRight: '1.25rem',
    flex: 1,
  },
  masked: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '0.63rem',
    alignSelf: 'center',
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
  },
  marginBottom: {
    marginBottom: '.2rem',
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

export default CreateProduct;
