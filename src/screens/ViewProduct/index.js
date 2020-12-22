import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';

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
import TextInput from '../../components/Input';
import Button from '../../components/Button';


const ViewProduct = ({route}) => {
	const {product} = route.params;
	console.log(product.photo_path);

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

					<TextInput label="Quantidade" placeholder="Insira a quantidade..." keyboardType="number-pad" />
				
					<Space />

					<Button type="secondary" title="Comprar" borderWidth={0} />
				</InfoContainer>
			</ScrollView>
		</Container>
	);
};

export default ViewProduct;