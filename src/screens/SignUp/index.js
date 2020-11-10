import React, {useState} from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Form} from './styles';

const SignUp = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = () => {};

  return (
    <Container>
      <Form>
        <Input
          label="Nome Completo"
          value={name}
          onChangeText={setName}
          placeholder="Digite seu nome"
          autoCompleteType="name"
          autoCapitalize="words"
        />

        <Input
          label="CPF"
          typeInput="mask"
          type={'cpf'}
          value={cpf}
          onChangeText={setCpf}
          placeholder="Ex. 999.999.999-99"
          keyboardType="numeric"
          autoCompleteType="off"
          autoCapitalize="none"
        />

        <Input
          label="Telefone"
          typeInput="mask"
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
          value={phone}
          onChangeText={setPhone}
          placeholder="Ex. (99) 99999-9999"
          keyboardType="phone-pad"
          autoCompleteType="off"
          autoCapitalize="none"
        />

        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCompleteType="email"
          autoCapitalize="none"
        />

        <Input
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          autoCompleteType="off"
          autoCapitalize="none"
          secureTextEntry
        />

        <Button title="Criar" type="primary" onPress={submitHandler} />
      </Form>
    </Container>
  );
};

export default SignUp;
