import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Layout from '../layout';
import RegisterForm from '../../components/category/auth/RegisterForm';
import LoginForm from '../../components/category/auth/LoginForm';
import {LayoutStyles} from '../../components/category/styles';
import firebase from '../../utils/firebase';
import 'firebase/auth';

const Register = ({navigation}) => {
  const INITIAL_STATE = {
    email: '',
    password: '',
  };
  const [values, setValues] = useState(INITIAL_STATE);
  const [user, setuser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setuser(response);
    });
  }, []);

  if (user) {
    return null;
  }

  


  return (
    <>
      <Layout nav={() => navigation.openDrawer()} />

      <View style={LayoutStyles.container}>
        {user ? (
         <RegisterForm navigation={navigation} /> 
        ) : (
              <LoginForm navigation={navigation} setValues={setValues}  />
         
              
        )}
      </View>
    </>
  );
};

export default Register;
