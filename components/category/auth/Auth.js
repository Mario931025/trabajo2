import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Auth(props) {
  const [isLogin, setisLogin] = useState(true);

  const {navigation} = props;

  const changeForm = () => {
    setisLogin(!isLogin);
  };

  return (
    <View>
      {isLogin ? (
        <LoginForm changeForm={changeForm} navigation={navigation} />
      ) : (
        <RegisterForm changeForm={changeForm} navigation={navigation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
