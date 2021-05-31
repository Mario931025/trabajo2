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
} from 'react-native';
import {LayoutStyles, formStyles} from '../../../components/category/styles';
import {TextInput, Button} from 'react-native-paper';
import firebase from '../../../utils/firebase';
import {validateEmail} from '../../../utils/validations';
import Layout from '../../../views/layout';
import 'firebase/auth';
import {Platform} from 'react-native';
import {Alert} from 'react-native';
import {StoreContext} from '../../../core';

const width = Dimensions.get('window').width;

export default function Perfil(props) {
  //Access user global state
  const {state} = useContext(StoreContext);
  const {globalState} = state;
  const {user} = globalState;
  console.log('user form profile=>', user);
  //Access user global state

  const {navigation} = props;

  const [formData, setformData] = useState(defaultValue());
  const [formerror, setFormError] = useState({});

  const login = () => {
    let errors = {};

    if (!formData.emailf || !formData.password) {
      if (!formData.emailf) {
        errors.emailf = true;
      }
      if (!formData.password) {
        errors.password = true;
      }
    } else if (!validateEmail(formData.emailf)) {
      Alert.alert('EL FORMATO DEBE SER XXXX@CORREO.COM');
      errors.emailf = true;
    } else if (formData.password.length < 6) {
      //en firabebase se exige contraseña mayor a 6 caracteres
      Alert.alert('LA CONTRASEÑA DEBE SER MAYOR A 6 CARACTERES');
      errors.password = true;
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.emailf, formData.password)
        .then(function (user) {
          console.log('cerraste sesion');
          navigation.navigate('Perfil');
        })
        .catch(() => {
          setFormError({
            emailf: true,
            password: true,
          });
        });
    }

    setFormError(errors);
  };

  const onType = (e, type) => {
    setformData({
      ...formData,
      [type]: e.nativeEvent.text,
    });
  };

  function defaultValue() {
    return {
      emailf: '',
      password: '',
    };
  }

  function logout() {
    firebase.auth().signOut();
    navigation.navigate('Register');
    console.log('saliste de sesion');
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Layout nav={() => navigation.openDrawer()} />
        <View style={LayoutStyles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={styles.titulo}>PERFIL</Text>
            <Image
              style={styles.user}
              source={require('../../../assets/png/default-user-image.png')}
            />
            <Text> EMAIL</Text>
            <TextInput
              value={user.email}
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
              value={user.password}
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
              placeholder={'Ingresa tu nueva contraseña'}
            />
            <Button
              mode="contained"
              style={[formStyles.btnSucces, styles.btnLogin]}
              onPress={() => logout()}>
              SIERRA SESIÓN
            </Button>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </>
  );
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
