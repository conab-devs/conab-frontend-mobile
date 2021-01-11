import React, {useState} from 'react';
import {Alert} from 'react-native';

import Input from '../../../components/input';
import Button from '../../../components/button';

import {Container, Form} from '../styles';

const Code = ({route, navigation}) => {
  const {email} = route.params;
  const [code, setCode] = useState('');

  const confirmCode = () => {
    if (!code) {
      Alert.alert('Código inválido', 'O campo de código é obrigatório.');
      return;
    }

    navigation.navigate('forgotpassword-resetpassword', {email, code});
  };

  return (
    <Container>
      <Form>
        <Input
          label="Código"
          value={code}
          onChangeText={setCode}
          placeholder="Digite o código de 6 digitos"
          keyboardType="numeric"
          autoCapitalize="none"
          minLength={6}
        />

        <Button title="Confirmar" type="primary" onPress={confirmCode} />
      </Form>
    </Container>
  );
};

export default Code;
