import React, {useRef, useState} from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Form} from './styles';

const SignOut = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const cpfRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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
          returnKeyType="next"
          onSubmitEditing={() => cpfRef.current.focus()}
        />

        <Input
          label="CPF"
          type="mask"
          value={cpf}
          placeholder="Ex. 999.999.999-99"
          keyboardType="numeric"
          autoCompleteType="off"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => phoneRef.current.focus()}
          onChangeText={(formatted) => {
            setCpf(formatted);
          }}
          mask={'[000].[000].[000]-[00]'}
        />

        <Input
          label="Telefone"
          type="mask"
          value={phone}
          placeholder="Ex. (99) 99999-9999"
          keyboardType="phone-pad"
          autoCompleteType="tel"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
          onChangeText={(formatted) => {
            setPhone(formatted);
          }}
          mask={'([00]) [00000]-[0000]'}
        />

        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCompleteType="email"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => {}}
        />

        <Input
          label="Senha"
          ref={passwordRef}
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          autoCompleteType="off"
          autoCapitalize="none"
          secureTextEntry
          returnKeyType="send"
          onSubmitEditing={submitHandler}
        />

        <Button title="Criar" type="primary" onPress={submitHandler} />
      </Form>
    </Container>
  );
};

export default SignOut;
