import React, {useState} from 'react';
import {Alert, View} from 'react-native';

import api from '../../services/api';
import Input from '../../components/input';
import Button from '../../components/button';
import Container from '../../components/container';
import EStyleSheet from 'react-native-extended-stylesheet';

const ResetPassword = ({route, navigation}) => {
  const {email, code} = route.params;
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const resetPassword = async () => {
    if (!password || !passwordConfirmation) {
      Alert.alert('Senha inválida', 'Os campos de senha são obrigatórios.');
      return;
    }

    try {
      await api.post('/password/reset', {
        email,
        password,
        password_confirmation: passwordConfirmation,
        code,
      });
      Alert.alert('Sucesso', 'Senha redefinida.');
      navigation.navigate('signin');
    } catch (err) {
      if (err.response.status === 422) {
        Alert.alert('Dados inválidos', 'Preencha os dados corretamente');
      }
    }
  };

  return (
    <Container style={{ justifyContent: 'flex-start', backgroundColor: 'white' }}>
      <View style={styles.form}>
        <Input
          label="Nova senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Digite a nova senha"
          autoCapitalize="none"
          secureTextEntry
          minLength={6}
        />

        <Input
          label="Confirmar senha"
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          placeholder="Digite novamente a senha"
          autoCapitalize="none"
          secureTextEntry
          minLength={6}
        />

        <Button title="Redefinir" type="primary" onPress={resetPassword} />
      </View>
    </Container>
  );
};

const styles = EStyleSheet.create({
  form: {
    marginTop: '3.12rem',
    width: '100%',
  }
});

export default ResetPassword;
