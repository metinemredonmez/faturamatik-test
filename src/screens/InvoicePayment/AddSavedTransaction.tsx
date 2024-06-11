//import liraries
import {Text} from '@/components';
import Header from '@/components/Header/Header';
import {colors} from '@/config';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Keyboard,
} from 'react-native';
import {Button, Card, Switch, TouchableOpacity} from 'react-native-ui-lib';
import InvoiceItem from './InvoiceItem';
import {useBasket} from '@/contexts/basket/Context';
import useFetch from '@/hooks/useFetch';
import {addBasket, listBaskets} from '@/api/basket';
import {useAuth} from '@/contexts/auth/Context';
import {
  Notifier,
  NotifierComponents,
  NotifierRoot,
} from 'react-native-notifier';
import {useLoading} from '@/contexts/loading/Context';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';
import LottieView from 'lottie-react-native';
import {addNewTransaction} from '@/api/user';

// create a component
const AddSavedTransaction = ({
  route,
  navigation,
}: NativeStackScreenProps<any>) => {
  const auth = useAuth();

  const [invoiceTitle, setInvoiceTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [setPlay, setSetPlay] = useState(false);
  const loading = useLoading();

  const [mobileNotification, setMobileNotification] = useState(true);
  const [emailNotification, setEmailNotification] = useState(true);
  const [smsNotification, setSmsNotification] = useState(true);

  const [
    addNewTransactionMutation,
    {
      data: addNewTransactionMutationData,
      error: addNewTransactionMutationError,
      loading: addNewTransactionMutationLoading,
    },
  ] = useFetch<any>();

  const handleSave = () => {
    setTitleError(false);
    if (invoiceTitle.length < 1) {
      setTitleError(true);
      return;
    }

    console.log(route.params);

    addNewTransactionMutation(addNewTransaction, ({
        token: auth?.token,
        title: invoiceTitle,
        mobileNotification: mobileNotification ? "1" : "0",
        mailNotification: emailNotification ? "1" : "0",
        smsNotification: smsNotification ? "1" : "0",
        subscriptionNumber: route.params?.subscriptionNumber,
        company: route.params?.company,
    }));
  };

  useEffect(() => {
    if (addNewTransactionMutationError) {
      console.log(addNewTransactionMutationError);
    }
  }, [addNewTransactionMutationError]);

  useEffect(() => {
    if (addNewTransactionMutationData) {
      if (addNewTransactionMutationData[0].sonuc == 200) {
        setSetPlay(true);
        modalizeRef.current?.open();
      } else {
        console.log(addNewTransactionMutationData);
        Notifier.showNotification({
          title: 'Hata',
          description: addNewTransactionMutationData[0].aciklama,
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'error',
          },
        });
      }
    }
  }, [addNewTransactionMutationData]);

  const modalizeRef = useRef<any>(null);
  const notifierRef = useRef<any>(null);

  return (
    <View style={styles.container}>
      <NotifierRoot ref={notifierRef} />
      <Portal>
        <Modalize ref={modalizeRef} snapPoint={340}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
            }}>
            <LottieView
              source={require('@/assets/animation/success.json')}
              autoPlay={setPlay}
              loop={false}
              style={{width: 200, height: 200}}
            />
            <Text medium size={15} color="#484848">
              Fatura başarıyla kaydedildi.
            </Text>
            <Button
              style={{marginVertical: 5, width: '80%'}}
              backgroundColor={colors.primary}
              label="Tamam"
              onPress={() => {
                modalizeRef.current?.close();
                navigation.navigate('HomeScreen');
              }}
            />
          </View>
        </Modalize>
      </Portal>

      <SafeAreaView style={{margin: 10, backgroundColor: 'white'}}>
        <Header title="Yeni Fatura Kaydet" leftSide />
        <View style={styles.invoiceInfoContainer}>
          <View style={{flexDirection: 'column'}}>
            <Text color="#484848" size={15} semibold>
              {route.params?.company}
            </Text>
            <Text color="#484848" size={14} regular>
              {route.params?.category}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View>
              <Text color="#484848" size={12} regular>
                Ad Soyad
              </Text>
              <Text color="#484848" size={12} regular>
                Abone No
              </Text>
            </View>
            <View>
              <Text color="#484848" size={12} semibold>
                {route.params?.subscriptionName}
              </Text>
              <Text color="#484848" size={12} semibold>
                {route.params?.subscriptionNumber}
              </Text>
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <View
              style={{
                backgroundColor: colors.red,
                padding: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <Text color="#484848" size={12} regular color="white">
                Faturaya vermek istediğiniz başlığı giriniz.
              </Text>
            </View>
            <TextInput
              value={invoiceTitle}
              returnKeyLabel="Bitti"
              returnKeyType="done"
              placeholderTextColor="#8391A1"
              placeholder="Fatura Başlığı"
              style={{
                ...styles.input,
                borderColor: titleError ? 'red' : '#E8ECF4',
              }}
              onChange={e => setInvoiceTitle(e.nativeEvent.text)}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            {titleError && (
              <Text size={12} color="red">
                Fatura başlığı boş bırakılamaz.
              </Text>
            )}

            <View
              style={{
                backgroundColor: colors.red,
                padding: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <Text color="#484848" size={12} regular color="white">
                Faturanızı kaydederken bildirim almak istediğiniz kanalları
                seçin.
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <Text size={14} semibold>
                  Mobil Bildirimler
                </Text>
                <Switch
                  onColor={colors.primary}
                  value={mobileNotification}
                  onValueChange={(value: any) => {
                    setMobileNotification(value);
                  }}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <Text size={14} semibold>
                  Sms Bildirimler
                </Text>
                <Switch
                  onColor={colors.primary}
                  value={smsNotification}
                  onValueChange={(value: any) => {
                    setSmsNotification(value);
                  }}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <Text size={14} semibold>
                  Email Bildirimler
                </Text>
                <Switch
                  onColor={colors.primary}
                  value={emailNotification}
                  onValueChange={(value: any) => {
                    console.log(value);
                    setEmailNotification(value);
                  }}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.resultButton} onPress={handleSave}>
              {addNewTransactionMutationLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text bold color="white">
                  Kaydet
                </Text>
              )}
            </TouchableOpacity>
          </View>
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
  resultButton: {
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
export default AddSavedTransaction;
