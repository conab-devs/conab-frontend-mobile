import React from 'react';
import {
  TouchableWithoutFeedback as Card, 
  View, 
  Image, 
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Product = (props) => (
  <Card onPress={props.handlePress}>
    <View style={styles.wrapper}>
      <Image
        style={styles.image}
        source={{
          uri: props.imagePath,
        }}
      />
      <View style={styles.content}>
        <View>
          <Text style={styles.emphatized}>{props.name}</Text>
          <Text style={styles.cooperativeName}>{props.cooperativeName}</Text>
        </View>
        <Text style={styles.emphatized}>
          R$ {props.price} / {props.unitMeasure === 'unit' ? 'Unidade' : 'Kg'}
        </Text>
      </View>
    </View>
  </Card>
);

const styles = EStyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: '5rem',
    marginBottom: '.62rem',
  },
  image: {
    height: '5rem',
    width: '5rem',
    borderRadius: 6,
  },
  content: {
    height: '100%',
    marginLeft: '1rem',
    justifyContent: 'space-around',
  },
  emphatized: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#363d46',
  },
  cooperativeName: {
    fontSize: '.75rem',
    color: '#363d46',
  }
});

export default Product;
