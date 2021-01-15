import React from 'react';
import {Text, FlatList, ActivityIndicator} from 'react-native';
import {Container, Wrapper} from './styles'
import {useSelector} from 'react-redux';
import Product from '../../components/product'; 
import Button from '../../components/button';

const Cart = ({navigation}) => {
	const cart = useSelector(state => state.product.cart);

	return (
		<Container>
			<Wrapper>
				<FlatList
		            data={cart}
		            showsVerticalScrollIndicator={false}
		            initialNumToRender={5}
		            onEndReachedThreshold={0.1}
		     
		            renderItem={({item}) => (
		              <Product
		                name={item.name}
		                cooperativeName={item.cooperative.name}
		                price={item.price}
		                unitMeasure={item.unit_of_measure}
		                imagePath={item.photo_path}
		                handlePress={() => {
		                  navigation.navigate('ViewProduct', {product: item});
		                }}
		              />
		            )}
		            keyExtractor={(item) => `${item.id}`}
	          />
	          <Button 
							type="secondary" 
							title="Finalizar Compra" 
							borderWidth={0}
						/>
			</Wrapper>
		</Container>
	);
};

export default Cart;