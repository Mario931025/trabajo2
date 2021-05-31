import React, {useContext, useState} from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {LayoutStyles, formStyles} from '../../../components/category/styles';
import {TextInput, Button} from 'react-native-paper';
import firebase from '../../../utils/firebase';
import {validateEmail} from '../../../utils/validations';
import {Platform} from 'react-native';
import {StoreContext} from '../../../core';
import {setUserDispatch} from '../../../core/global/actions';

const width = Dimensions.get('window').width;

const LoginForm = ({navigation, changeForm, setValues}) => {
  const {globalDispatch} = useContext(StoreContext);
  const [formData, setformData] = useState(defaultValue());
  const [formerror, setFormError] = useState({});

  const validation = () => {
    let errors = {};

    if (!formData.emailf || !formData.password) {
      if (!formData.emailf) {
        errors.emailf = true;
        return true;
      }
      if (!formData.password) {
        errors.password = true;
        return true;
      }
    } else if (!validateEmail(formData.emailf)) {
      Alert.alert('EL FORMATO DEBE SER XXXX@CORREO.COM');
      errors.emailf = true;
      return true;
    } else if (formData.password.length < 6) {
      Alert.alert('LA CONTRASEÑA DEBE SER MAYOR A 6 CARACTERES');
      errors.password = true;
      return true;
    } else {
      return false;
    }
    setFormError(errors);
  };

  const login = async () => {
    const res = validation();
    if (res) {
      return;
    }
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(formData.emailf, formData.password);
      setUserDispatch(
        {email: formData.emailf, password: formData.password},
        globalDispatch,
      );
      console.log('response user =>', user);
      navigation.navigate('Perfil');
    } catch (error) {
      console.log('error:login=>', error);
      setFormError({
        emailf: true,
        password: true,
      });
    }
  };

  const onType = (e, type) => {
    setformData({
      ...formData,
      [type]: e.nativeEvent.text,
    });
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={LayoutStyles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={styles.titulo}>LOGIN</Text>
            <Image
              style={styles.user}
              source={require('../../../assets/png/default-user-image.png')}
            />
            <Text> EMAIL</Text>
            <TextInput
              underlineColor="#967B4A"
              style={[
                formStyles.input,
                formStyles.btnText,
                formerror.emailf && styles.error,
              ]}
              onChange={(e) => {
                onType(e, 'emailf');
                setformData({...formData, emailf: e.nativeEvent.text});
              }}
            />
            <Text> CONTRASEÑA</Text>
            <TextInput
              style={[
                formStyles.input,
                formStyles.btnText,
                formerror.password && styles.error,
              ]}
              secureTextEntry
              onChange={(e) => {
                onType(e, 'password');
                setformData({...formData, password: e.nativeEvent.text});
              }}
            />

            <Button
              mode="contained"
              style={[formStyles.btnSucces, styles.btnLogin]}
              onPress={() => login()}>
              INICIA SESIÓN
            </Button>
            <Button
              mode="text"
              style={[formStyles.btnText, styles.btnRegister]}
              labelStyle={formStyles.btnTextLabel}
              onPress={changeForm}>
              Registrate
            </Button>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </>
  );
};

function defaultValue() {
  return {
    emailf: '',
    password: '',
  };
}

const styles = StyleSheet.create({
  user: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 80,
  },
  titulo: {
    fontSize: width / 18,
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: width / 3.2,
    paddingBottom: 20,
    marginTop: -8,
  },
  btnRegister: {
    marginTop: 10,
  },
  btnLogin: {
    marginTop: 15,
  },
  error: {
    borderColor: '#940c0c',
  },
});

export default LoginForm;
