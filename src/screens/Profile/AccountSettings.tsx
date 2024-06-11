//import liraries
import {getUser, updateUser} from '@/api/user';
import {Text} from '@/components';
import Header from '@/components/Header/Header';
import {colors} from '@/config';
import {useAuth} from '@/contexts/auth/Context';
import {useLoading} from '@/contexts/loading/Context';
import useFetch from '@/hooks/useFetch';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TextInput,
  Platform,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import MaskInput from 'react-native-mask-input';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {
  Button,
  Card,
  LoaderScreen,
  SkeletonView,
  Switch,
} from 'react-native-ui-lib';

// create a component

export interface AccountSettingsProps {
  setModal: any;
  user: any;
}

const AccountSettings = () => {
  const auth = useAuth();
  const loader = useLoading();
  const navigation = useNavigation();
  const [mobileNotification, setMobileNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [smsNotification, setSmsNotification] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [
    getUserQuery,
    {data: getUserData, error: getUserError, loading: getUserLoading},
  ] = useFetch<any>();

  const [
    updateUserMutation,
    {data: updateUserData, error: updateUserError, loading: updateUserLoading},
  ] = useFetch<any>();

  useEffect(() => {
    getUserQuery(getUser, {
      token: auth?.token,
    });
  }, []);

  useEffect(() => {
    if (getUserData) {
      setPhone(getUserData[0].t_gsm_no.substr(1));
      setEmail(getUserData[0].t_mail_adresi);
      setMobileNotification(
        getUserData[0].t_bildirim_mobil == '1' ? true : false,
      );
      setEmailNotification(
        getUserData[0].t_bildirim_mail == '1' ? true : false,
      );
      setSmsNotification(getUserData[0].t_bildirim_sms == '1' ? true : false);
    }
  }, [getUserData]);

  const successRef = React.useRef<any>(null);
  const errorRef = React.useRef<any>(null);

  const handleUpdateUser = () => {
    updateUserMutation(updateUser, {
      token: auth?.token,
      phone: '0'+phone,
      email: email,
      mobileNotification: mobileNotification ? '1' : '0',
      mailNotification: emailNotification ? '1' : '0',
      smsNotification: smsNotification ? '1' : '0',
    });
  };

  useEffect(() => {
    if (updateUserData) {
      console.log("userData",updateUserData);
      if (updateUserData[0].sonuc == '200') {
        console.log("success",updateUserData);
        successRef.current?.open();
      } else {
        setErrorMessage(updateUserData[0].aciklama);
        errorRef.current?.open();
      }
    }
  }, [updateUserData]);

  useEffect(() => {
    if (updateUserError) {
      console.log("error",updateUserError);
    }
  }, [updateUserError]);

  return (
    <View style={styles.container}>
      <Portal>
        <Modalize ref={successRef} snapPoint={350}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
            }}>
            <LottieView
              source={require('@/assets/animation/success.json')}
              autoPlay={true}
              loop={false}
              style={{width: 250, height: 250}}
            />
            <Text medium align="center" size={15} color="#484848">
              Kullanıcı bilgileriniz güncellendi.
            </Text>
            <Button
              style={{marginVertical: 5, width: '80%'}}
              backgroundColor={colors.primary}
              label="Tamam"
              onPress={() => {
                successRef.current?.close();
                navigation.goBack();
              }}
            />
          </View>
        </Modalize>
      </Portal>
      <Portal>
        <Modalize ref={errorRef} snapPoint={350}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
            }}>
            <LottieView
              source={require('@/assets/animation/error.json')}
              autoPlay={true}
              loop={false}
              style={{width: 200, height: 200}}
            />
            <Text medium align="center" size={15} color="#484848">
              {errorMessage}
            </Text>
            <Button
              style={{marginVertical: 10, width: '80%'}}
              backgroundColor={colors.primary}
              label="Tamam"
              onPress={() => {
                errorRef.current?.close();
              }}
            />
          </View>
        </Modalize>
      </Portal>
      <Spinner visible={updateUserLoading} />
      <SafeAreaView style={{flex: 1, margin: 10}}>
        <Header title="Hesap Bilgilerim" leftSide={true} />
        <Card
          loading={getUserLoading}
          enableShadow
          style={{
            padding: 10,
            marginTop: 20,
          }}>
          {getUserData && (
            <View>
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
                    alignItems: 'center',
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
                      height: 50,
                      width: '100%',
                      color: '#484848',
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
            </View>
          )}
        </Card>
        <Button
          onPress={handleUpdateUser}
          label="Kaydet"
          borderRadius={2}
          marginT-20
          backgroundColor={colors.primary}
          labelStyle={{fontWeight: 'bold'}}
        />
      </SafeAreaView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
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
});

//make this component available to the app
export default AccountSettings;
