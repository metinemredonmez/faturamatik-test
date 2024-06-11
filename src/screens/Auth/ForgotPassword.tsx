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
//@ts-ignore
import {KeyboardAwareInsetsView} from 'react-native-ui-lib/keyboard';

import MaskInput from 'react-native-mask-input';
import useFetch from '@/hooks/useFetch';
import {checkTc, sendSmsForgotPassword} from '@/api/user';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

// create a component
const ForgotPassword = ({
  navigation,
}: NativeStackScreenProps<any, 'Register'>) => {
  const [id, setId] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const showDatePicker = () => {
    setDateVisible(true);
  };

  const hideDatePicker = () => {
    setDateVisible(false);
  };

  const [
    sendSmsForgotPasswordMutation,
    {
      data: sendSmsForgotPasswordMutationData,
      error: sendSmsForgotPasswordMutationError,
      loading: sendSmsForgotPasswordMutationLoading,
    },
  ] = useFetch<any>();

  const onLogin = () => {
    let newBirtDate = moment(date).format('DD/MM/YYYY');
    console.log('newBirtDate', newBirtDate);
    sendSmsForgotPasswordMutation(sendSmsForgotPassword, {
      id,
      birthDate: moment(date).format('YYYY-MM-DD'),
    });
  };

  useEffect(() => {
    if (sendSmsForgotPasswordMutationData) {
      console.log(
        'sendSmsForgotPasswordMutationData',
        sendSmsForgotPasswordMutationData,
      );
      if (sendSmsForgotPasswordMutationData[0].sonuc == 403) {
        setErrorVisible(true);
      } else {
        navigation.navigate('PasswordTwoFactor', {
          data: {
            id,
            birthDate,
          },
        });
      }
    }
  }, [sendSmsForgotPasswordMutationData]);

  const RenderErrorButtons = () => {
    return (
      <View
        style={{
          marginVertical: 10,
          display: 'flex',
          flexDirection: 'column',
        }}>
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

  return (
    <View style={styles.container}>
      <ErrorMessage
        visible={errorVisible}
        title="Hata"
        description={
          sendSmsForgotPasswordMutationData &&
          sendSmsForgotPasswordMutationData[0].aciklama
        }
        buttons={<RenderErrorButtons />}
      />
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
            Şifre Sıfırlama
          </Text>
        </View>
        <ScrollView style={{marginTop: 30}}>
          <View style={{marginVertical: 10}}>
            <DatePicker
              textColor={colors.primary}
              theme="light"
              modal
              mode="date"
              locale="tr"
              confirmText="Tamam"
              cancelText="İptal"
              title="Doğum Tarihiz"
              open={dateVisible}
              date={date}
              onConfirm={date => {
                setDate(date);
                setBirthDate(
                  date.getDate() +
                    '/' +
                    (date.getMonth() + 1) +
                    '/' +
                    date.getFullYear(),
                );
                setDateVisible(false);
              }}
              onCancel={() => {
                setDateVisible(false);
              }}
            />

            <TextInput
              value={id}
              onChangeText={setId}
              returnKeyLabel="Bitti"
              returnKeyType="done"
              keyboardType="numeric"
              placeholderTextColor="#8391A1"
              placeholder="T.C Kimlik Numarası"
              style={styles.input}
              onBlur={() => Keyboard.dismiss()}
            />
          </View>
          <View style={{marginVertical: 10}}>
            {/* <TextInput
              editable={false}
              returnKeyLabel="Bitti"
              returnKeyType="done"
              keyboardType="numeric"
              placeholderTextColor="#8391A1"
              placeholder="Doğum Tarihi Gün/Ay/Yıl"
              style={styles.input}
              onPressIn={() => showDatePicker()}
              onFocus={() => showDatePicker()}
              value={birthDate}
            /> */}
            <TouchableOpacity
              
              onPress={() => setDateVisible(true)}
              style={{ 
                borderWidth: 0.5,
                
                backgroundColor: '#F7F8F9',
                height: 56,
                padding: 10,
                borderRadius: 5,
                borderColor: '#E8ECF4',
                display: 'flex',
                justifyContent: 'center',
               }}>
              <Text color="#484848" medium>{birthDate ? moment(date).format('DD/MM/YYYY') : 'Doğum Tarihiniz'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => onLogin()}
            disabled={sendSmsForgotPasswordMutationLoading}
            style={styles.loginButton}>
            {sendSmsForgotPasswordMutationLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text size={14} medium color="white">
                Devam Et
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
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
export default ForgotPassword;
