import React, {useState} from 'react';
import {Alert} from 'react-native';
import {StyleSheet, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';

import Photo from '../../components/Photo';
import {
	Container, 
	ProductName, 
	Price, 
	InfoContainer,
	Text,
	Delimiter,
	Space,
} from './styles';
import TextInput from '../../components/input';
import Button from '../../components/button';
import {allActions} from '../../redux/Product';

const ViewProduct = ({route}) => {
	const {product} = route.params;
	const [amount, setAmount] = useState(1);
	const dispatch = useDispatch();

	function getPrice(price) {
		return price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
	}

	return (
		<Container>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Photo productPicture={{path: product.photo_path}} height={200} width={200} editable={false} />
				<ProductName>{product.name}</ProductName>
				<InfoContainer>
					<Price>R$ {getPrice(product.price)} / {product.unit_of_measure === 'unit' ? 'Unidade' : 'Kg'}</Price>

					<Text>Cooperative: {product.cooperative.name}</Text>
					<Text>{product.estimated_delivery_time === 0 ? 'Não realizamos entrega' : `Tempo de entrega: ${product.estimated_delivery_time}`}</Text>
				
					<Delimiter />

					<TextInput 
						label="Quantidade" 
						placeholder="Insira a quantidade..." 
						keyboardType="number-pad"
						defaultValue={`${amount}`}
						onChangeText={setAmount} 
					/>
				
					<Space />

					<Button 
						type="secondary" 
						title="Comprar" 
						borderWidth={0}
						onPress={() => {
							if (!Number.isNaN(amount)) {
								const cartProduct = Object.assign({}, product);
								cartProduct.amount = amount;
								dispatch(allActions.pushToCart({product: cartProduct}));
							} else {
								Alert.alert('Escolha uma quantia válida.');
							}
						}}
					/>
				</InfoContainer>
			</ScrollView>
		</Container>
	);
};

export default ViewProduct;