import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Form, Upload, UploadImage} from './styles';
import {darkblue} from '../../styles/colors';
import {PermissionsAndroid, Platform} from 'react-native';

const launchImageLibraryAsync = (options = {}) => {
  return new Promise((resolve) =>
    ImagePicker.launchImageLibrary(options, resolve),
  );
};

const SignUp = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uri, setUri] = useState(null);
  const [canUploadOnAndroid, setCanUploadOnAndroid] = useState(false);

  useEffect(() => {
    (async function requestAndroidPermission() {
      const permission = PermissionsAndroid.PERMISSIONS.CAMERA;
      const hasPermission = await PermissionsAndroid.check(permission);

      if (!hasPermission) {
        const status = await PermissionsAndroid.request(permission);
        setCanUploadOnAndroid(
          Platform.OS === 'android' && status === 'granted',
        );
      }

      setCanUploadOnAndroid(hasPermission);
    })();
  }, []);

  const submitHandler = () => {};

  const uplaodImage = async () => {
    try {
      const result = await launchImageLibraryAsync();
      console.log(result.uri);
      setUri(result.uri);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Form>
        <Upload onPress={uplaodImage}>
          {uri ? (
            <UploadImage source={{uri}} />
          ) : (
            <Icon name="camera" size={40} color={darkblue} />
          )}
        </Upload>
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
