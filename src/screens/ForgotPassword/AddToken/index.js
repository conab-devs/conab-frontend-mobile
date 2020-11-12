import React, {useEffect, useState} from 'react';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {Container, Form} from '../styles';

const AddToken = () => {
  const [code, setCode] = useState('');

  const submitHandler = () => {
    // TODO: implementar a confirmação de "recuperar senha"
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
        />

        <Button title="Confirmar" type="primary" onPress={submitHandler} />
      </Form>
    </Container>
  );
};

export default AddToken;
