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
} from 'react-native';

import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import useFetch from '@/hooks/useFetch';
import {login, loginWithToken} from '@/api/user';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import {useAuth} from '@/contexts/auth/Context';
import {useLocalStorage} from '@/hooks/useLocalStorage';
import {useNotification} from '@/contexts/notification/Context';
import {Toast} from 'react-native-ui-lib';
// create a component
const TwoFactorScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<any, 'TwoFactor'>) => {
  const [errorVisible, setErrorVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [token, setToken] = useState(route.params?.token);

  const noti = useNotification();

  const auth = useAuth();

  const storage = useLocalStorage();

  const [
    checkCodeMutation,
    {
      data: checkCodeMutationData,
      error: checkCodeMutationError,
      loading: checkCodeMutationLoading,
    },
  ] = useFetch<any>();

  const [
    loginMutation,
    {
      data: loginMutationData,
      error: loginMutationError,
      loading: loginMutationLoading,
    },
  ] = useFetch<any>();

  const onLogin = () => {
    checkCodeMutation(loginWithToken, {
      code: value,
      token: token,
    });
  };

  useEffect(() => {
    if (checkCodeMutationData) {
      if (checkCodeMutationData[0]?.sonuc == 200) {
        const {t_token, t_ad, t_soyad} = checkCodeMutationData[0];

        auth.setToken(t_token);

        auth.setUser({
          name: t_ad,
          surname: t_soyad,
        });

        storage.setItem('token', t_token);
        storage.setItem('user', JSON.stringify({name: t_ad, surname: t_soyad}));
        storage.setItem('id', route.params?.username);
        storage.setItem('password', route.params?.password);

        auth.setIsLogin(true);
        auth.setId(route.params?.username);
        auth.setPassword(route.params?.password);

        navigation.navigate('Faturamatik');
      } else {
        setErrorVisible(true);
      }
    }
  }, [checkCodeMutationData]);

  useEffect(() => {
    setTimeout(() => {
      if (value == '') {
        setIsTimeOut(true);
      }
    }, 6000);
  }, []);

  const inputAccessoryViewID = 'uniqueID';

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (loginMutationData) {
      if (loginMutationData[0].sonuc == 200) {
        setToken(loginMutationData[0].t_token);
        setSuccessVisible(true);
        setValue('');
      }
    }
  }, [loginMutationData]);

  return (
    <View style={styles.container}>
      {/* <ErrorMessage
        visible={errorVisible}
        title="Hata"
        description="Girmiş olduğunuz kod hatalıdır"
        buttons={<TouchableOpacity onPress={() => setErrorVisible(false)}><Text>Tamam</Text></TouchableOpacity>}
      /> */}
      <SafeAreaView style={{margin: 15}}>
        <View
          style={{
            marginVertical: 10,
            display: 'flex',
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
        </View>
        <View style={styles.header}>
          <Text bold size={20}>
            Sms Doğrulama
          </Text>
          <Text regular color="#838BA1" size={15}>
            Lütfen telefonunuza gelen doğrulama kodunu giriniz.
          </Text>
        </View>
        <ScrollView style={{marginTop: 30}}>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoFocus={true}
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          <TouchableOpacity
            onPress={() => onLogin()}
            disabled={checkCodeMutationLoading}
            style={styles.loginButton}>
            {checkCodeMutationLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text size={14} medium color="white">
                Giriş Yap
              </Text>
            )}
          </TouchableOpacity>
          {isTimeOut && (
            <TouchableOpacity
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                padding: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#E8ECF4',
              }}
              onPress={async () => {
                loginMutation(login, {
                  username: route.params?.username,
                  password: route.params?.password,
                });
              }}>
              <Text size={14} medium color="black">
                {loginMutationLoading ? (
                  <ActivityIndicator color="black" />
                ) : (
                  'Tekrar Gönder'
                )}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
      <Toast
        visible={errorVisible}
        position="bottom"
        backgroundColor="red"
        message={checkCodeMutationData && checkCodeMutationData[0].aciklama}
        onDismiss={() => setErrorVisible(false)}
        swipeable={true}
        autoDismiss={3000}
        showDismiss={true}
      />
      <Toast
        visible={successVisible}
        position="bottom"
        backgroundColor="green"
        message={loginMutationData && loginMutationData[0].mesaj}
        onDismiss={() => setSuccessVisible(false)}
        swipeable={true}
        autoDismiss={3000}
        showDismiss={true}

/>
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
    fontSize: 12,
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
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 14,
    borderWidth: 0.5,
    borderRadius: 7,
    borderColor: '#E8ECF4',
    textAlign: 'center',
    backgroundColor: '#F7F8F9',
    color: '#484848',
  },
  focusCell: {
    borderColor: colors.primary,
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default TwoFactorScreen;
