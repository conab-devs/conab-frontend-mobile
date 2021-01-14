import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {login} from '../redux/Auth/actions';
import Button from '../components/button';
import Input from '../components/input';

import Container from '../components/container';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = () => {
    dispatch(login({email, password}));
  };

  return (
    <Container style={styles.container}>
      <Text style={styles.title}>
        Bem-vindo(a) ao aplicativo <Text style={styles.bold}>Conarket</Text>
      </Text>
      <View style={styles.form}>
        <View style={styles.inputs}>
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
            minLength={6}
            secureTextEntry
          />

          <Text
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('forgotpassword-request')}>
            Esqueci a senha
          </Text>
        </View>

        <Button title="Entrar" type="primary" onPress={submitHandler} />
        <Button
          title="Criar conta"
          type="outline"
          onPress={() => navigation.navigate('signup')}
        />
      </View>
    </Container>
  );
};

const styles = EStyleSheet.create({
  title: {
    width: '100%',
    fontSize: '2.37rem',
    color: '$darkBlue',
    marginBottom: '.5rem',
  },
  form: {
    width: '100%',
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: 'bold',
  },
  inputs: {
    marginBottom: '2.5rem',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    fontSize: '1rem',
    textDecorationLine: 'underline',
    color: '$darkBlue',
  },
  container: {
    paddingTop: '2rem',
    justifyContent: 'flex-end',
  },
});

export default SignIn;
