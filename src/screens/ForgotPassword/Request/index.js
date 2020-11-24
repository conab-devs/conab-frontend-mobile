import React, {useState} from 'react';
import {Alert} from 'react-native';

import api from '../../../services/api';
import {Container, Form} from '../styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const Request = ({navigation}) => {
  const [email, setEmail] = useState('');

  const sendCode = async () => {
    if (!email) {
      Alert.alert('Email inválido', 'O campo de email é obrigatório.');
      return;
    }

    try {
      const response = await api.post('/password/reset/request', {email});
      Alert.alert('Código enviado!', response.data.message);
      navigation.navigate('forgotpassword-code', {email});
    } catch (err) {
      if (err.response.status === 404) {
        Alert.alert(
          'Email inválido',
          'Nenhum usuário encontrado com esse endereço de email.',
        );
      }
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

        <Button title="Enviar código" type="primary" onPress={sendCode} />
      </Form>
    </Container>
  );
};

export default Request;
