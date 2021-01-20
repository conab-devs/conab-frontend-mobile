import React, {useState} from 'react';
import {Alert, View} from 'react-native';

import Input from '../../components/input';
import Button from '../../components/button';
import Container from '../../components/container';
import EStyleSheet from 'react-native-extended-stylesheet';

const Code = ({route, navigation}) => {
  const {email} = route.params;
  const [code, setCode] = useState('');

  const confirmCode = () => {
    if (!code) {
      Alert.alert('Código inválido', 'O campo de código é obrigatório.');
      return;
    }

    navigation.navigate('forgotpassword-resetpassword', {email, code});
  };

  return (
    <Container style={{ justifyContent: 'flex-start', backgroundColor: 'white' }}>
      <View style={styles.form}>
        <Input
          label="Código"
          value={code}
          onChangeText={setCode}
          placeholder="Digite o código de 6 digitos"
          keyboardType="numeric"
          autoCapitalize="none"
          minLength={6}
        />

        <Button title="Confirmar" type="primary" onPress={confirmCode} />
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

export default Code;
