//import liraries
import {Text} from '@/components';
import {colors} from '@/config';
import {Icon} from '@rneui/themed';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableOpacityBase,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';

import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
//@ts-ignore
import {KeyboardAwareInsetsView} from 'react-native-ui-lib/keyboard';
import MaskInput from 'react-native-mask-input';
import {NotifierRoot} from 'react-native-notifier';
import {useNotification} from '@/contexts/notification/Context';
import useFetch from '@/hooks/useFetch';
import {register, sendSmsConfirmation} from '@/api/user';
import RegisterSms from './RegisterSms';
import {getStatusBarHeight} from 'react-native-status-bar-height';
// create a component
const RegisterStep2 = ({
  navigation,
  route,
}: NativeStackScreenProps<any, 'Register'>) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // const [email, setEmail] = useState('emrullah.ayilmazdir@gmail.com');
  // const [phone, setPhone] = useState('5369118377');

  const [gender, setGender] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);

  const [modal, setModal] = useState(false);

  const [errors, setErrors] = useState<any[]>([]);

  const [
    registerMutation,
    {
      data: registerMutationData,
      error: registerMutationError,
      loading: registerMutationLoading,
    },
  ] = useFetch<any>();

  const [
    registerSmsMutation,
    {
      data: registerSmsMutationData,
      error: registerSmsMutationError,
      loading: registerSmsMutationLoading,
    },
  ] = useFetch<any>();

  const data = route.params?.data;

  const noti = useNotification();

  const onLogin = () => {
    // if (password !== rePassword) {
    //   noti.handleNotification({
    //     type: 'error',
    //     message: 'Şifreler Eşleşmiyor',
    //   });
    // }

    let error = [];

    if (!password) {
      error.push('password');
    }
    if (!rePassword) {
      error.push('rePassword');
    }
    if (!email) {
      error.push('email');
    }
    if (!phone) {
      error.push('phone');
    }

    if (error.length > 0) {
      setErrors(error);
      return;
    } else {
      setErrors([]);

      if (password !== rePassword) {
        noti.handleNotification({
          type: 'error',
          message: 'Şifreler Eşleşmiyor',
        });
        return;
      } else {
        registerMutation(register, {
          name: name,
          surname: surname,
          email: email,
          phone: phone.split(' ').join(''),
          password,
          id,
          birthDate,
          gender,
        });
      }
    }
  };

  useEffect(() => {
    if (data) {
      setId(data.id);
      setName(data.ad);
      setSurname(data.soyad);
      setBirthDate(data.dogum_tarihi);
      setGender(data.cinsiyet);
    }
  }, [data]);

  useEffect(() => {
    if (registerMutationData) {
      if (registerMutationData[0].sonuc == 403) {
        noti.handleNotification({
          type: 'error',
          message: registerMutationData[0].aciklama,
        });
      } else if (registerMutationData[0].sonuc == 400) {
        noti.handleNotification({
          type: 'error',
          message: registerMutationData[0].aciklama,
        });
      } else {
        registerSmsMutation(sendSmsConfirmation, {
          id: id,
          birthDate: birthDate,
        });
      }
    }
  }, [registerMutationData]);

  useEffect(() => {
    if (registerMutationError) {
      console.log(registerMutationError);
    }
  }, [registerMutationError]);
  useEffect(() => {
    if (registerSmsMutationData) {
      if (registerSmsMutationData[0].sonuc == 403) {
        noti.handleNotification({
          type: 'error',
          message: registerSmsMutationData[0].aciklama,
        });
      } else if (registerSmsMutationData[0].sonuc == 400) {
        noti.handleNotification({
          type: 'error',
          message: registerSmsMutationData[0].aciklama,
        });
      } else {
        setModal(true);
      }
    }
  }, [registerSmsMutationData]);

  const inputAccessoryViewID = 'uniqueID';
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  return (
    <View style={styles.container}>
      <Modal
        visible={modal}
        animationType="slide"
        presentationStyle="fullScreen">
        <RegisterSms
          data={{
            id: id,
            birthDate: birthDate,
          }}
          navigation={navigation}
          setModal={setModal}
        />
      </Modal>

      <SafeAreaView style={{marginHorizontal: 15}}>
        <View
          style={{
            
            backgroundColor: 'white',
            zIndex: 9999,
            display: 'flex',
            flexDirection:"row",
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back}>
            <Icon
              name="chevron-left"
              type="feather"
              size={24}
              color="#1E232C"
            />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text bold size={20}>
              Kayıt ol.
            </Text>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <View style={{marginVertical: 5}}>
            <TextInput
              editable={false}
              value={name}
              returnKeyLabel="İleri"
              returnKeyType="next"
              placeholderTextColor="#8391A1"
              placeholder="Adınız"
              style={styles.input}
              onBlur={() => Keyboard.dismiss()}
            />
          </View>
          <View style={{marginVertical: 5}}>
            <TextInput
              editable={false}
              value={surname}
              returnKeyLabel="İleri"
              returnKeyType="next"
              placeholderTextColor="#8391A1"
              placeholder="Soyadınız"
              style={styles.input}
              onBlur={() => Keyboard.dismiss()}
            />
          </View>
          <View style={{marginVertical: 5}}>
            <TextInput
              editable={false}
              value={id}
              returnKeyLabel="Bitti"
              returnKeyType="next"
              keyboardType="number-pad"
              placeholderTextColor="#8391A1"
              placeholder="T.C Kimlik Numarası"
              style={styles.input}
              onBlur={() => Keyboard.dismiss()}
            />
          </View>
          <View style={{marginVertical: 5}}>
            <TextInput
              editable={false}
              returnKeyLabel="İleri"
              returnKeyType="next"
              keyboardType="email-address"
              placeholderTextColor="#8391A1"
              placeholder="Doğum Tarihiniz"
              style={styles.input}
              onBlur={() => Keyboard.dismiss()}
              value={birthDate}
            />
          </View>
          <View>
            <Text size={15} medium color={colors.red}>
              Telefon Numaranızı Başında 0 Olmadan Giriniz
            </Text>
          </View>
          <View>
            <View
              style={{
                marginVertical: 10,
                display: 'flex',
                flexDirection: 'row',
                ...styles.input,
              }}>
              <View
                style={{
                  width: '10%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                }}>
                <Text size={15} medium>
                  +90
                </Text>
              </View>
              <MaskInput
                style={{
                  fontFamily: 'Poppins-Medium',
                  height: 40,
                  width: '100%',
                }}
                returnKeyLabel="Bitti"
                returnKeyType="done"
                keyboardType="number-pad"
                placeholderTextColor="#8391A1"
                placeholder="Telefon Numaranız"
                value={phone}
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  ' ',
                  /\d/,
                  /\d/,
                  /\d/,
                  ' ',
                  /\d/,
                  /\d/,
                  ' ',
                  /\d/,
                  /\d/,
                ]}
                onChangeText={(masked, unmasked, obfuscated) => {
                  setPhone(masked);
                }}
                onBlur={() => Keyboard.dismiss()}
              />
            </View>
            {errors.includes('phone') && (
              <Text size={12} medium color={colors.red}>
                Telefon Numarası Boş Bırakılamaz
              </Text>
            )}
          </View>
          <View style={{marginVertical: 5}}>
            <TextInput
              returnKeyLabel="İleri"
              returnKeyType="done"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#8391A1"
              placeholder="E-Posta Adresiniz"
              style={styles.input}
              onBlur={() => Keyboard.dismiss()}
              value={email}
              onChange={e => setEmail(e.nativeEvent.text)}
            />
            {errors.includes('email') && (
              <Text size={12} medium color={colors.red}>
                E-Posta Adresi Boş Bırakılamaz
              </Text>
            )}
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
              value={password}
              onChange={e => setPassword(e.nativeEvent.text)}
            />
            {errors.includes('password') && (
              <Text size={12} medium color={colors.red}>
                Şifre Boş Bırakılamaz
              </Text>
            )}
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
            {errors.includes('rePassword') && (
              <Text size={12} medium color={colors.red}>
                Şifre Tekrar Boş Bırakılamaz
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() => onLogin()}
            disabled={registerMutationLoading}
            style={styles.loginButton}>
            {registerMutationLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text size={14} medium color="white">
                Kayıt Ol
              </Text>
            )}
          </TouchableOpacity>
          <KeyboardAwareInsetsView />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  back: {
    padding: 5,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {},
  input: {
    borderWidth: 0.5,
    color: '#484848',
    backgroundColor: '#F7F8F9',

    ...Platform.select({
      ios: {
        height: 56,
      },
      android: {
        height: 46,
      },
    }),
    padding: 5,
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
export default RegisterStep2;
