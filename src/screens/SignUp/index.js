import React, {useState} from 'react';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';

import Input from '../../components/input';
import Button from '../../components/button';

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
  const [avatar, setAvatar] = useState({file: null, uri: ''});
  const [canUpload, setCanUpload] = useState(false);

  const requestUploadPermission = async () => {
    if (Platform.OS === 'android') {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      const hasPermission = await PermissionsAndroid.check(permission);

      if (!hasPermission) {
        const status = await PermissionsAndroid.request(permission);
        setCanUpload(status === 'granted');
        return;
      }

      setCanUpload(hasPermission);
    }

    // TODO: verificar permissão para o IOS
  };

  const submitHandler = () => {
    // TODO: verificar se os dados foram preenchido e depois utilizar o FormData para enviar os dados para o servidor
  };

  const uplaodImage = async () => {
    if (!canUpload) {
      await requestUploadPermission();
      return;
    }

    const result = await launchImageLibraryAsync({saveToPhotos: false});

    if (result.errorMessage) {
      return;
    }

    if (result.didCancel) {
      Alert.alert('Upload de Imagem', 'Envio de imagem cancelado');
      return;
    }

    /* eslint-disable no-undef */
    const file = new File([result.data], result.fileName, {
      type: result.type,
    });
    setAvatar({file, uri: result.uri});
  };

  return (
    <Container>
      <Form>
        <Upload onPress={uplaodImage}>
          {avatar.uri ? (
            <UploadImage source={{uri: avatar.uri}} />
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
