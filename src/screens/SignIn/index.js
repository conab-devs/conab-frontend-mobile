import React, {useState} from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {Container, Title, Bold, Form, Inputs, ForgotPassword} from './styles';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('email@email.com');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Title>
        Bem-vindo ao aplicativo <Bold>Conarket</Bold>
      </Title>
      <Form>
        <Inputs>
          <Input label="e-mail" onChangeText={setEmail} value={email} />
          <Input label="password" onChangeText={setPassword} value={password} />
          <ForgotPassword>Esqueci a senha</ForgotPassword>
        </Inputs>

        <Button title="Entrar" type="primary" onPress={() => {}} />
        <Button title="Cadastrar-se" type="outline" onPress={() => {}} />
      </Form>
    </Container>
  );
};

export default SignIn;
