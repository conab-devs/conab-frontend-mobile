import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';

import {createFormData} from '../helpers';
import {allActions} from '../redux/Product';
import Form from '../components/product-form';

const CreateProduct = ({navigation}) => {
  const {categories} = useSelector((state) => state.product);
  const {cooperative_id} = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (requestFields, callback) => {
      if (
        requestFields.price > 0 &&
        requestFields.category > 0 &&
        typeof requestFields.estimated_delivery_time === 'number' &&
        requestFields.name !== '' &&
        (requestFields.unit_of_measure === 'kg' ||
          requestFields.unit_of_measure === 'unit') &&
        requestFields.productPicture &&
        requestFields.productPicture.path !== ''
      ) {
        const data = createFormData(requestFields.productPicture, {
          name: requestFields.name,
          price: requestFields.price,
          category_id: requestFields.category,
          estimated_delivery_time: requestFields.estimated_delivery_time,
          unit_of_measure: requestFields.unit_of_measure,
        });

        dispatch(allActions.createProduct({product: data}));
        dispatch(
          allActions.fetchProductsByCooperative({
            cooperative: cooperative_id,
            page: 1,
            previous: [],
          }),
        );

        navigation.goBack();
      } else {
        callback(false);
        Alert.alert('Ops, preencha os campos corretamente');
      }
    },
    [navigation, dispatch, cooperative_id],
  );

  const getCategories = useCallback(() => {
    return categories.map((category) => ({
      label: category.name,
      value: category.id,
    }));
  }, [categories]);

  return (
    <Form
      title="Adicionar Produtos"
      categories={getCategories()}
      handleSubmit={handleSubmit}
      buttonDescriptor="Adicionar"
    />
  );
};

export default CreateProduct;
