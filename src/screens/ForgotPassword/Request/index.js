import React, {useState} from 'react';

import {Container, Form} from '../styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {Alert} from 'react-native';

const Request = ({navigation}) => {
  const [email, setEmail] = useState('');

  const submitHandler = () => {
    // TODO: Efetuar a requsição de "recuperar senha".

    Alert.alert(
      'Código enviado!',
      'O código de 6 digitos foi enviado para seu endereço de email.',
    );

    navigation.navigate('forgotpassword-addtoken');
  };

  return (
    <Container>
      <Form>
        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCompleteType="email"
          autoCapitalize="none"
        />

        <Button title="Enviar código" type="primary" onPress={submitHandler} />
      </Form>
    </Container>
  );
};

export default Request;
