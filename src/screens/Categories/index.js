import React, {useState, useCallback, useEffect, useContext} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Container, Category, Text} from './styles';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../services/api';
import {FilterContext} from '../../contexts';
import {allActions} from '../../redux/Product';

const Categories = () => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);
  const categories = useSelector((state) => state.product.categories);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(allActions.fetchCategories());
  }, [dispatch]);

  return (
    <Container>
      <FlatList
        /*ListFooterComponent={
          <Button>
            <ButtonText>Outras Categorias</ButtonText>
          </Button>
        }*/
        showsVerticalScrollIndicator={false}
        style={styles.list}
        columnWrapperStyle={styles.justify}
        numColumns={2}
        data={categories}
        renderItem={({item}) => (
          <Category
            onPress={() => {
              navigation.navigate('Products', {category: item.id});
            }}>
            <Text>{item.name}</Text>
          </Category>
        )}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  justify: {
    justifyContent: 'space-between',
  },
});

export default Categories;