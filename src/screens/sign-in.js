import React from 'react';
import {useDispatch} from 'react-redux';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {login} from '../redux/Auth/actions';
import Button from '../components/button';
import Input from '../components/input';
import Container from '../components/container';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O campo E-mail é obrigatório'),
  password: Yup.string()
    .required('O campo Senha é obrigratório')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <Container style={styles.container}>
      <Text style={styles.title}>
        Bem-vindo(a) ao aplicativo <Text style={styles.bold}>Conarket</Text>
      </Text>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={SignInSchema}
        onSubmit={(values) => dispatch(login(values))}>
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <View style={styles.form}>
            <View style={styles.inputs}>
              <Input
                label="E-mail"
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                autoCompleteType="email"
                autoCapitalize="none"
                error={errors.email}
                touched={touched.email}
              />

              <Input
                label="Senha"
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Digite sua senha"
                autoCapitalize="none"
                minLength={6}
                secureTextEntry
                error={errors.password}
                touched={touched.password}
              />

              <Text
                style={styles.forgotPassword}
                onPress={() => navigation.navigate('forgotpassword-request')}>
                Esqueci a senha
              </Text>
            </View>

            <Button title="Entrar" type="primary" onPress={handleSubmit} />
            <Button
              title="Criar conta"
              type="outline"
              onPress={() => navigation.navigate('signup')}
              style={{
                btn: {
                  borderWidth: 2,
                },
              }}
            />
          </View>
        )}
      </Formik>
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
