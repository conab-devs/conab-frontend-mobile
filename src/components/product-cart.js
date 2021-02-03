import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import EStyleSheet from 'react-native-extended-stylesheet';
import NumberFormat from 'react-number-format';
import NumericInput from 'rn-numeric-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Product = (props) => (
  <View style={styles.card}>
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
          <View style={styles.header}>
            <Text style={styles.productName}>{props.name}</Text>
            <Icon
              name="close"
              color="#363D46"
              size={20}
              onPress={() => {
                
              }}
            />
          </View>
          <NumberFormat 
            value={props.price} 
            displayType={'text'} 
            thousandSeparator="." 
            decimalSeparator=","
            prefix={'R$'} 
            renderText={value => (
              <Text style={styles.emphatized}>
                {value} / {props.unitMeasure === 'unit' ? 'Unidade' : 'Kg'}
              </Text>
            )} 
          />
          <NumericInput 
            onChange={(value) => console.log(value)} 
            step={0.1}
            valueType="real"
            totalHeight={styles.numericInput.height}
            totalWidth={styles.numericInput.width}
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            rightButtonBackgroundColor={styles.inputStyle.backgroundColor}
            leftButtonBackgroundColor={styles.inputStyle.backgroundColor}
            iconStyle={styles.icon}
            initValue={0.1}
            minValue={0.1}
            editable
          />

          <TouchableOpacity style={styles.negociate}>
            <Text style={styles.negociateText}>Contate o vendedor</Text>
          </TouchableOpacity>
      </View>

    </View>
  </View>
);

const styles = EStyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: '7.5rem',
    marginBottom: '.62rem',
    width: '100%'
  },
  image: {
    height: '7.5rem',
    width: '7.5rem',
    borderRadius: 6,
  },
  content: {
    height: '100%',
    marginLeft: '1rem',
    justifyContent: 'flex-start',
    width: '100%'
  },
  emphatized: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#363d46',
    marginBottom: '.9rem',
  },
  cooperativeName: {
    fontSize: '.7rem',
    color: '#363d46',
  },
  card: {
    backgroundColor: '$green',
    width: '23rem',
    height: '8.5rem',
    paddingLeft: '.5rem',
    paddingRight: '.5rem',
    paddingBottom: '.5rem',
    paddingTop: '.5rem',
    borderRadius: 12,
  },
  productName: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#428061',
  },
  numericInput: {
    height: '1.6rem',
    width: '13rem',
  },
  containerStyle: {
    borderWidth: 0,
  },
  inputStyle: {
    backgroundColor: '$lightGray', 
    borderWidth: 0,
    color: '$darkBlue'
  },
  icon: {
    color: '$green'
  },
  negociate: {
    backgroundColor: '$darkBlue',
    width: '13rem',
    height: '1.6rem',
    marginTop: '.3rem',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  negociateText: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '13rem',
  }
});

export default Product;
