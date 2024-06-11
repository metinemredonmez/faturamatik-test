//import liraries
import {Text} from '@/components';
import {colors} from '@/config';
import {Icon} from '@rneui/themed';
import React, {Component, useState, useRef, useEffect} from 'react';

import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Modal,
} from 'react-native';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import {color} from '@rneui/base';
import useFetch from '@/hooks/useFetch';
import {login} from '@/api/user';
import TwoFactor from './TwoFactor';
//@ts-ignore
import {SkypeIndicator, PacmanIndicator} from 'react-native-indicators';
import {useNotification} from '@/contexts/notification/Context';

import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextField} from 'react-native-ui-lib';

// create a component
const LoginScreen = ({navigation}: NativeStackScreenProps<any, 'Login'>) => {
  // const [username, setUsername] = useState('36571680006');
  // const [password, setPassword] = useState('Emrullah.1971');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isSecure, setIsSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const noti = useNotification();

  const [
    loginMutation,
    {
      data: loginMutationData,
      error: loginMutationError,
      loading: loginMutationLoading,
    },
  ] = useFetch<any>();

  const onLogin = () => {
    loginMutation(login, {
      username,
      password,
    });
  };
  

  const secondInputRef = useRef(null);

  const focusSecondInput = () => {
    secondInputRef.current?.focus();
  };

  const RenderErrorButtons = () => {
    return (
      <View
        style={{marginVertical: 10, display: 'flex', flexDirection: 'column'}}>
        <TouchableOpacity
          onPress={() => setErrorVisible(false)}
          style={{
            backgroundColor: colors.primary,
            padding: 10,
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text size={12} medium color="white">
            Tekrar Dene
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setErrorVisible(false);
            navigation.navigate('ForgotPassword');
          }}
          style={{
            borderWidth: 0.5,
            borderColor: colors.primary,
            padding: 10,
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text size={12} medium color={colors.primary}>
            Şifremi Unuttum
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    if (loginMutationError) {
      console.log(loginMutationError);
      setErrorVisible(true);
    }
  }, [loginMutationError]);

  useEffect(() => {
    if (loginMutationData) {
      console.log(loginMutationData);
      if (loginMutationData[0]?.sonuc == 200) {
        console.log('token', loginMutationData[0].t_token);
        setUsername('');
        setPassword('');
        navigation.navigate('TwoFactor', {
          username,
          password,
          token: loginMutationData[0].t_token,
        });
        console.log('var');
      } else {
        setErrorVisible(true);
      }
    } else {
      console.log('yok');
    }
  }, [loginMutationData]);

  return (
    <View style={styles.container}>
      <ErrorMessage
        buttons={<RenderErrorButtons />}
        visible={errorVisible}
        title="Hata"
        description="Girdiğiniz bilgiler hatalıdır. Kontrol edip tekrar deneyiniz."
      />
      <SafeAreaView style={{margin: 10, paddingHorizontal: 20}}>
        <View style={styles.header}>
          <Text bold size={20}>
            Hoşgeldin
          </Text>
        </View>
        <View style={{marginTop: 30}}>
          <View style={{marginVertical: 10}}>
            <TextInput
              value={username}
              returnKeyLabel="Bitti"
              returnKeyType="done"
              keyboardType="number-pad"
              placeholderTextColor="#8391A1"
              placeholder="T.C Kimlik Numarası"
              style={styles.input}
              onChange={e => setUsername(e.nativeEvent.text)}
              onSubmitEditing={() => focusSecondInput()}
            />
            {/* <TextField
              placeholder={'T.C Kimlik Numarası'}
              floatingPlaceholder
              onChangeText={(value:any) => console.log('value', value)}
              enableErrors
              validate={['required', (value:any) => value.length > 6]}
              validationMessage={[
                'T.c Kimlik Numarası boş bırakılamaz',
                'Email is invalid',
                'Password is too short',
              ]}
              showCharCounter
              validateOnBlur
              maxLength={11}
            /> */}
          </View>
          <View
            style={{
              marginVertical: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TextInput
              secureTextEntry={isSecure}
              placeholderTextColor="#8391A1"
              placeholder="Şifre"
              style={styles.input}
              ref={secondInputRef}
              value={password}
              onChange={e => setPassword(e.nativeEvent.text)}
            />
            <TouchableOpacity
              onPress={() => setIsSecure(!isSecure)}
              style={styles.eyeIcon}>
              <Icon
                name={isSecure ? 'eye' : 'eye-off'}
                type="feather"
                size={18}
                color="#8391A1"
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text
                size={12}
                regular
                color="#8391A1"
                style={{textAlign: 'right'}}>
                Şifremi Unuttum
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => onLogin()}
            disabled={loginMutationLoading}
            style={styles.loginButton}>
            {loginMutationLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text size={14} medium color="white">
                Giriş Yap
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 100,
        }}>
        <Text size={14} medium color="#8391A1">
          Hesabın yok mu?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text size={14} semibold color={colors.primary}>
            Kayıt Ol
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 20,
  },
  input: {
    borderWidth: 0.5,
    color: '#484848',
    backgroundColor: '#F7F8F9',
    height: 56,
    padding: 10,
    borderRadius: 5,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    borderColor: '#E8ECF4',
    width: '100%',
  },
  eyeIcon: {
    right: '50%',
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#1E232C',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

//make this component available to the app
export default LoginScreen;
