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
import {checkTc} from '@/api/user';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
// create a component
const RegisterScreen = ({
  navigation,
}: NativeStackScreenProps<any, 'Register'>) => {
  const [id, setId] = useState('');
  const [date, setDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);

  const [
    checkTcMutation,
    {
      data: checkTcMutationData,
      error: checkTcMutationError,
      loading: checkTcMutationLoading,
    },
  ] = useFetch<any>();

  const onLogin = () => {
    checkTcMutation(checkTc, {
      id,
      birthDate: moment(date).format('YYYY-MM-DD'),
    });
  };

  useEffect(() => {
    if (checkTcMutationData) {
      if (checkTcMutationData[0].sonuc == 403) {
        setErrorVisible(true);
      } else {
        navigation.navigate('RegisterStep2', {
          data: {
            ...checkTcMutationData[0],
            id,
            birthDate,
          },
        });
      }
    }
  }, [checkTcMutationData]);

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
        description={checkTcMutationData && checkTcMutationData[0].aciklama}
        buttons={<RenderErrorButtons />}
      />
      <SafeAreaView style={{margin: 15}}>
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
            Kayıt ol
          </Text>
        </View>
        <ScrollView style={{marginTop: 30}}>
          <View style={{marginVertical: 10}}>
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
            disabled={checkTcMutationLoading}
            style={styles.loginButton}>
            {checkTcMutationLoading ? (
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
export default RegisterScreen;
