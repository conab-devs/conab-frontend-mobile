import React from 'react';
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image, ImageHolder} from './styles';

const Photo = ({productPicture, handleImagePicking, height, width, editable = true}) => (
	<ImageHolder height={height} width={width}>
      {productPicture ? (
        <Image source={{uri: productPicture.path}} />
      ) : null}
      {editable ? <Icon
        name="image-edit"
        size={20}
        color="#000000"
        style={styles.icon}
        onPress={handleImagePicking}
      /> : null}
    </ImageHolder>
);

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
});

export default Photo;