import React, {useCallback} from 'react';
import {Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Form from '../components/product-form';
import {allActions} from '../redux/Product';

const UpdateProduct = ({route, navigation}) => {
	const {id} = route.params;
  	const {categories} = useSelector((state) => state.product);
  	const dispatch = useDispatch();

  	const getCategories = useCallback(() => {
	  return categories.map((category) => ({
	    label: category.name,
	    value: category.id,
	  }));
	}, [categories]);

	const updateProduct = useCallback((product) => {
		dispatch(allActions.updateProduct({ product, id }));
		dispatch(allActions.getProduct({ id }));
		navigation.goBack();
	}, []);

	return (
		<Form 
			title="Atualizar" 
			handleSubmit={updateProduct} 
			categories={getCategories()} 
			buttonDescriptor="Atualizar"
			photoShown={false}
			availabilityShown={true}
			unitOfMeasureShown={false}
			productId={id}
		/>
	);
}

export default UpdateProduct;