import React from 'react';
import {TouchableOpacity as Card, View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import EStyleSheet from 'react-native-extended-stylesheet';

const Product = (props) => (
  <Card onPress={props.handlePress} activeOpacity={0.7}>
    <View style={styles.wrapper}>
      <FastImage
        style={styles.image}
        source={{
          uri: props.imagePath,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.normal}
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
    height: '4.5rem',
    marginBottom: '.62rem',
  },
  image: {
    height: '4.5rem',
    width: '4.5rem',
    borderRadius: 6,
  },
  content: {
    height: '100%',
    marginLeft: '1rem',
    justifyContent: 'space-around',
  },
  emphatized: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#363d46',
  },
  cooperativeName: {
    fontSize: '.7rem',
    color: '#363d46',
  },
});

export default Product;
