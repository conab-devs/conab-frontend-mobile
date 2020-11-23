import React, {useState} from 'react';
import {Alert} from 'react-native';

import api from '../../../services/api';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {Container, Form} from '../styles';

const ResetPassword = ({route, navigation}) => {
  const {email, code} = route.params;
  const [password, setPassword] = useState('');

  const submitHandler = async () => {
    if (!password) {
      Alert.alert('Senha inválida', 'O campo de senha é obrigatório.');
      return;
    }

    try {
      // TODO: Adicionar o campo de confirmação de password.
      await api.post('/password/reset', {email, password, code});
      Alert.alert('Sucesso', 'Senha redefinida.');
      navigation.navigate('signin');
    } catch (err) {
      if (err.response.status === 422) {
        Alert.alert('Dados inválidos', 'Preencha os dados corretamente');
      }
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
          secureTextEntry
          minLength={6}
        />

        <Button title="Redefinir" type="primary" onPress={submitHandler} />
      </Form>
    </Container>
  );
};

export default ResetPassword;
