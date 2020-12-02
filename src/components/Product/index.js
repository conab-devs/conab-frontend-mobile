import React from 'react';
import {TouchableWithoutFeedback as Card, View} from 'react-native';
import {
  Container,
  ImageContainer,
  Content,
  Image,
  Emphatized,
  CooperativeName,
} from './styles';

const Product = (props) => (
  <Card>
    <Container>
      <ImageContainer>
        <Image
          source={{
            uri: props.imagePath,
          }}
        />
      </ImageContainer>
      <Content>
        <View>
          <Emphatized>{props.name}</Emphatized>
          <CooperativeName>{props.cooperativeName}</CooperativeName>
        </View>
        <Emphatized>
          R$ {props.price} / {props.unitMeasure}
        </Emphatized>
      </Content>
    </Container>
  </Card>
);

export default Product;
