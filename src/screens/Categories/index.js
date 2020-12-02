import React, {useState, useCallback, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Container, Category, Text, ButtonText, Button} from './styles';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import axios from '../../services/api';

const Categories = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const [categories, setCategories] = useState([]);

  axios.defaults.headers.common['Authorization'] = token;
  const fetchCategories = useCallback(async () => {
    const {data, status} = await axios.get('/categories');

    if (status === 200) {
      setCategories(data);
    }

  }, [token]);

  useEffect(() => {
    fetchCategories();
  }, []);


  return (
    <Container>
      <FlatList
        ListFooterComponent={
          <Button>
            <ButtonText>Outras Categorias</ButtonText>
          </Button>
        }
        showsVerticalScrollIndicator={false}
        style={styles.list}
        columnWrapperStyle={styles.justify}
        numColumns={2}
        data={categories}
        renderItem={({item}) => (
          <Category onPress={() => navigation.navigate('Products', {
              category: item.id,
            })
          }>
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
