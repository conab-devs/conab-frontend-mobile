import React, {useState} from 'react';
import {Alert} from 'react-native';

import api from '../../../services/api';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {Container, Form} from '../styles';

const ResetPassword = ({route}) => {
  const {email, code} = route.params;
  const [password, setPassword] = useState('');

  const submitHandler = async () => {
    // TODO: requisita a rota de resetar senha e fazer a alteração no estado global.
    try {
      // const response = await api.post('/password/reset', {
      //   email,
      //   password,
      //   code,
      // });
      // console.log(response);
    } catch (err) {
      // TODO: mostrar os erros corretos.
      Alert.alert('Erro', 'Email inválido');
    }
  };

  return (
    <Container>
      <Form>
        <Input
          label="Nova senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Digite a nova senha"
          autoCapitalize="none"
          minLength={6}
          secureTextEntry
        />

        <Button title="Redefinir" type="primary" onPress={submitHandler} />
      </Form>
    </Container>
  );
};

export default ResetPassword;
