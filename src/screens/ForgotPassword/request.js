import React, {useState} from 'react';
import {Alert, View} from 'react-native';

import api from '../../services/api';
import Input from '../../components/input';
import Button from '../../components/button';
import Container from '../../components/container';
import EStyleSheet from 'react-native-extended-stylesheet';

const Request = ({navigation}) => {
  const [email, setEmail] = useState('');

  const sendCode = async () => {
    if (!email) {
      Alert.alert('Email inválido', 'O campo de email é obrigatório.');
      return;
    }

    try {
      const response = await api.post('/password/reset/request', {email});
      Alert.alert('Código enviado!', response.data.message);
      navigation.navigate('forgotpassword-code', {email});
    } catch (err) {
      if (err.response.status === 404) {
        Alert.alert(
          'Email inválido',
          'Nenhum usuário encontrado com esse endereço de email.',
        );
      }
    }
  };

  return (
    <Container style={{ justifyContent: 'flex-start', backgroundColor: 'white' }}>
      <View style={styles.form}>
        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCompleteType="email"
          autoCapitalize="none"
        />

        <Button title="Enviar código" type="primary" onPress={sendCode} />
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

export default Request;
