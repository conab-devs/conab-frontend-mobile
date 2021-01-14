import React, {useState} from 'react';
import {
  Alert,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import EStyleSheet from 'react-native-extended-stylesheet';

import Input from '../components/input';
import Button from '../components/button';

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
    <View style={styles.container}>
      <ScrollView
        style={styles.form}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.formContent}>
        <TouchableOpacity style={styles.upload} onPress={uplaodImage}>
          {avatar.uri ? (
            <Image style={styles.uploadImage} source={{uri: avatar.uri}} />
          ) : (
            <Icon name="camera" size={40} color={styles.darkBlue.color} />
          )}
        </TouchableOpacity>

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

        <Button
          title="Criar"
          type="primary"
          onPress={submitHandler}
          style={{btn: styles.btn}}
        />
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '1.7rem',
    paddingBottom: '.5rem',
    paddingRight: '1.25rem',
    paddingLeft: '1.25rem',
  },
  btn: {
    marginTop: '3rem',
  },
  form: {
    marginTop: '1.25rem',
    width: '100%',
  },
  formContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  upload: {
    alignSelf: 'center',
    height: '6.25rem',
    width: '6.25rem',
    borderRadius: '.35rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$lightGray',
    marginBottom: '1,25rem',
    overflow: 'hidden',
  },
  uploadImages: {
    width: '100%',
    height: '100%',
  },
  darkBlue: {
    color: '$darkBlue',
  },
});

export default SignUp;
