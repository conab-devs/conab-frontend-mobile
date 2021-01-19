import React, {useEffect} from 'react';
import {FlatList, View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {allActions} from '../redux/Product';
import EStyleSheet from 'react-native-extended-stylesheet';
import {getContainer} from '../styles/utils';

const Categories = () => {
  const navigation = useNavigation();
  const categories = useSelector((state) => state.product.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.fetchCategories());
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        columnWrapperStyle={styles.justify}
        numColumns={2}
        data={categories}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.category}
            onPress={() => {
              dispatch(allActions.setProducts({products: []}));
              navigation.navigate('Products', {
                category: item.id,
                searchString: '',
              });
            }}>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  list: {
    width: '100%',
  },
  justify: {
    justifyContent: 'space-between',
  },
  container: {
    ...getContainer(),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: '2.18rem',
    backgroundColor: '$lightGray',
  },
  category: {
    height: '10rem',
    backgroundColor: 'white',
    width: '10rem',
    borderRadius: '0.75rem',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: '0.95rem',
    paddingLeft: '.8rem',
    paddingRight: '.8rem',
    // paddingTop: '.2rem',
    // paddingBottom: '.2rem',
  },
  text: {
    marginBottom: '0.62rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
});

export default Categories;
