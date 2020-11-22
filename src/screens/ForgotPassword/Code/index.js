import React, {useState} from 'react';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {Container, Form} from '../styles';

const Code = ({route, navigation}) => {
  const {email} = route.params;
  const [code, setCode] = useState('');

  const submitHandler = () => {
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
          maxLength={6}
        />

        <Button title="Confirmar" type="primary" onPress={submitHandler} />
      </Form>
    </Container>
  );
};

export default Code;
