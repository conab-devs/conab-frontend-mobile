import React from 'react';
import {View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EStyleSheet from 'react-native-extended-stylesheet';

const Photo = ({
  productPicture,
  handleImagePicking,
  style,
  editable = true,
}) => {
  const styles = getStyles(style);
  return (
    <View style={styles.imageHolder}>
      {productPicture ? (
        <Image style={styles.image} source={{uri: productPicture.path}} />
      ) : null}
      {editable ? (
        <Icon
          name="square-edit-outline"
          size={20}
          color="#000000"
          style={styles.icon}
          onPress={handleImagePicking}
        />
      ) : null}
    </View>
  );
};

const getStyles = (styles = {}) =>
  EStyleSheet.create({
    icon: {
      position: 'absolute',
      right: 15,
      bottom: 15,
    },
    imageHolder: {
      width: '9.37rem',
      height: '9.37rem',
      backgroundColor: '$lightGray',
      marginTop: '1.3rem',
      marginBottom: '0.62rem',
      marginRight: 'auto',
      marginLeft: 'auto',
      borderRadius: 5,
      ...styles.imageHolder,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 5,
    },
  });

export default Photo;
