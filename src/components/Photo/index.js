import React from 'react';
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image, ImageHolder} from './styles';

const Photo = ({productPicture, handleImagePicking}) => (
	<ImageHolder>
      {productPicture ? (
        <Image source={{uri: productPicture.path}} />
      ) : null}
      <Icon
        name="image-edit"
        size={20}
        color="#000000"
        style={styles.icon}
        onPress={handleImagePicking}
      />
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