import React from 'react';
import {TouchableWithoutFeedback as Card, View} from 'react-native';
import {
  Container,
  Content,
  Image,
  Emphatized,
  CooperativeName,
} from './styles';

const Product = (props) => (
  <Card onPress={props.handlePress}>
    <Container>
      <Image
        source={{
          uri: props.imagePath,
        }}
      />
      <Content>
        <View>
          <Emphatized>{props.name}</Emphatized>
          <CooperativeName>{props.cooperativeName}</CooperativeName>
        </View>
        <Emphatized>
          R$ {props.price} / {props.unitMeasure === 'unit' ? 'Unidade' : 'Kg'}
        </Emphatized>
      </Content>
    </Container>
  </Card>
);

export default Product;
