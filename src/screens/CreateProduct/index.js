import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createFormData} from '../../helpers';
import {allActions} from '../../redux/Product';
import Form from '../../components/ProductForm';

const CreateProduct = ({navigation}) => {
  const {categories} = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (requestFields) => {
      if (
        requestFields.price > 0 &&
        requestFields.category > 0 &&
        typeof requestFields.deliveryTime === 'number' &&
        requestFields.name !== '' &&
        (requestFields.unitOfMeasure === 'kg' ||
          requestFields.unitOfMeasure === 'unit') &&
        requestFields.productPicture.path !== ''
      ) {
        const data = createFormData(requestFields.productPicture, {
          name: requestFields.name,
          price: requestFields.price,
          category_id: requestFields.category,
          estimated_delivery_time: requestFields.deliveryTime,
          unit_of_measure: requestFields.unitOfMeasure,
        });

        dispatch(allActions.createProduct({product: data}));

        navigation.goBack();
      }
    },
    [navigation, dispatch],
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
