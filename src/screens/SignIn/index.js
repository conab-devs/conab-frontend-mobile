import React, {useState} from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {Container} from '../../styles/utils';
import {Title, Bold, Form, Inputs, ForgotPassword} from './styles';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = () => {};

  return (
    <Container>
      <Title>
        Bem-vindo ao aplicativo <Bold>Conarket</Bold>
      </Title>
      <Form>
        <Inputs>
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
            autoCapitalize="none"
          />

          <ForgotPassword onPress={() => {}}>Esqueci a senha</ForgotPassword>
        </Inputs>

        <Button title="Entrar" type="primary" onPress={submitHandler} />
        <Button
          title="Cadastrar-se"
          type="outline"
          onPress={() => navigation.navigate('signup')}
        />
      </Form>
    </Container>
  );
};

export default SignIn;
