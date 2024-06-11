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

import {NavigationProp, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import {color} from '@rneui/base';
import useFetch from '@/hooks/useFetch';
import {changeForgotPassword, login} from '@/api/user';
import TwoFactor from './TwoFactor';
//@ts-ignore
import {SkypeIndicator, PacmanIndicator} from 'react-native-indicators';
import {useNotification} from '@/contexts/notification/Context';

// create a component
const ChangePassword = ({navigation}: NativeStackScreenProps<any, 'Login'>) => {
  const route = useRoute<any>();

  const {id, code, birthDate} = route.params;

  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  // const [rePassword, setRePassword] = useState('05369118377');
  // const [password, setPassword] = useState('Emrullah.1971');

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
    loginMutation(changeForgotPassword, {
      id: id,
      code: code,
      birthDate: birthDate.split('/').reverse().join('-'),
      password: password,
    });
  };

  const secondInputRef = useRef(null);

  const focusSecondInput = () => {
    secondInputRef.current?.focus();
  };

  useEffect(() => {
    if (loginMutationData) {
      if (loginMutationData[0].sonuc == 200) {
        noti.handleNotification({
          type: 'success',
          message: 'Şifreniz başarıyla değiştirildi.',
        });
        navigation.navigate('Login');
      } else {
        noti.handleNotification({
          type: 'error',
          message: loginMutationData[0].aciklama,
        });
      }
    }
  }, [loginMutationData]);

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
        //navigation.navigate('Login');
      } else {
        //setErrorVisible(true);
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
        <View
          style={{
            marginVertical: 10,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.back}>
            <Icon
              name="chevron-left"
              type="feather"
              size={24}
              color="#1E232C"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text bold size={20}>
            Şifreni Değiştir
          </Text>
        </View>
        <View style={{marginTop: 30}}>
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
              placeholder="Şifre Tekrar"
              style={styles.input}
              ref={secondInputRef}
              value={rePassword}
              onChange={e => setRePassword(e.nativeEvent.text)}
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

          <TouchableOpacity
            onPress={() => onLogin()}
            disabled={loginMutationLoading}
            style={styles.loginButton}>
            {loginMutationLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text size={14} medium color="white">
                Değiştir
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
color:"#484848",
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
export default ChangePassword;
