import React, {useState} from 'react';
import {Alert} from 'react-native';

import api from '../../../services/api';
import {Container, Form} from '../styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const Request = ({navigation}) => {
  const [email, setEmail] = useState('');

  const submitHandler = async () => {
    // TODO: Requisita o endpoint de requisição de resetar senha.

    try {
      //await api.post('/password/reset/request', {email});
      Alert.alert(
        'Código enviado!',
        'O código de 6 digitos foi enviado para seu endereço de email.',
      );
      navigation.navigate('forgotpassword-code', {email});
    } catch (err) {
      // TODO: mostrar os erros corretos.
      Alert.alert('Erro', 'Email inválido');
    }
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
