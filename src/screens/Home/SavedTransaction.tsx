//import liraries
import {
  deleteTransaction,
  savedTransactions,
  updateTransaction,
} from '@/api/user';
import {Text} from '@/components';
import Empty from '@/components/Empty/Empty';
import Loading from '@/components/Loading/Loading';
import {colors} from '@/config';
import {useAuth} from '@/contexts/auth/Context';
import {useLoading} from '@/contexts/loading/Context';
import useFetch from '@/hooks/useFetch';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import moment from 'moment';
import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import {
  ActionBar,
  ActionSheet,
  Button,
  LoaderScreen,
  Switch,
} from 'react-native-ui-lib';
import Spinner from 'react-native-loading-spinner-overlay';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';
import LottieView from 'lottie-react-native';
import {invoiceInquiry} from '@/api/payment';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { RefreshControl } from 'react-native';

// create a component
const SavedTransaction = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const loader = useLoading();
  const auth = useAuth();
  const [message, setMessage] = useState<string>('');
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [invoiceTitle, setInvoiceTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [mobileNotification, setMobileNotification] = useState<boolean>(true);
  const [smsNotification, setSmsNotification] = useState<boolean>(true);
  const [emailNotification, setEmailNotification] = useState<boolean>(true);

  const modalizeRef = useRef<Modalize>(null);
  const handleActionModalizeRef = useRef<Modalize>(null);
  const actionModalizRef = useRef<Modalize>(null);
  const updateModaliRef = useRef<Modalize>(null);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);

  const [
    savedTransactionQuery,
    {
      data: savedTransactionQueryData,
      error: savedTransactionQueryError,
      loading: savedTransactionQueryLoading,
    },
  ] = useFetch<any>();

  const [fetchSubscriptionMutation, {data, error, loading}] = useFetch<any>();
  const [
    updateSavedTransactionMutation,
    {
      data: updateSavedTransactionMutationData,
      error: updateSavedTransactionMutationError,
      loading: updateSavedTransactionMutationLoading,
    },
  ] = useFetch<any>();

  const [
    deleteSavedTransactionMutation,
    {
      data: deleteSavedTransactionMutationData,
      error: deleteSavedTransactionMutationError,
      loading: deleteSavedTransactionMutationLoading,
    },
  ] = useFetch<any>();

  const getSavedTransactions = () => {
    savedTransactionQuery(savedTransactions, {
      token: auth?.token,
    });
  };

  useEffect(() => {
    getSavedTransactions();
  }, []);

  useEffect(() => {
    if (savedTransactionQueryData) {
      console.log(savedTransactionQueryData);
      loader.setLoading(false);
    }
  }, [savedTransactionQueryData]);

  useEffect(() => {
    if (savedTransactionQueryError) {
      loader.setLoading(false);
    }
  }, [savedTransactionQueryError]);

  useEffect(() => {
    if (savedTransactionQueryLoading) {
      loader.setLoading(true);
    }
  }, [savedTransactionQueryLoading]);

  useEffect(() => {
    if (data) {
      console.log(data);
      if (data[0].faturalar.length == 0) {
        setAutoPlay(true);
        actionModalizRef.current?.close();
        setTimeout(() => {
          setAutoPlay(false);
          modalizeRef.current?.open();
        }, 1000);
      } else {
        console.log(data[0].faturalar[0]);
        actionModalizRef.current?.close();
        navigation.navigate('SubscriptionInquiryResult', {
          company: {
            KurumTuru: data[0].faturalar[0].Kurum,
            KurumAdi: selectedTransaction?.t_kurum,
          },
          subscriptionNo: selectedTransaction?.t_abone_no,
          invoices: data[0].faturalar,
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (updateSavedTransactionMutationData) {
      console.log(updateSavedTransactionMutationData);
      if (updateSavedTransactionMutationData[0].sonuc == 200) {
        console.log(updateSavedTransactionMutationData);
        setMessage(updateSavedTransactionMutationData[0].mesaj);
        updateModaliRef.current?.close();
        handleActionModalizeRef.current?.open();
      } else {
        Alert.alert('Hata', updateSavedTransactionMutationData[0].aciklama);
      }
    }
  }, [updateSavedTransactionMutationData]);

  useEffect(() => {
    if (deleteSavedTransactionMutationData) {
      console.log(deleteSavedTransactionMutationData);
      if (deleteSavedTransactionMutationData[0].sonuc == 200) {
        console.log(deleteSavedTransactionMutationData);
        setMessage(deleteSavedTransactionMutationData[0].mesaj);
        updateModaliRef.current?.close();
        handleActionModalizeRef.current?.open();
      } else {
        Alert.alert('Hata', deleteSavedTransactionMutationData[0].aciklama);
      }
    }
  }, [deleteSavedTransactionMutationData]);

  if (savedTransactionQueryLoading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  

  const handleDelete = () => {
    Alert.alert(
      'Dikkat',
      'Kaydı silmek istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          onPress: () => console.log('Cancel Pressed'),
          style: 'destructive',
        },
        {
          text: 'Evet',
          onPress: () => {
            deleteSavedTransactionMutation(deleteTransaction, {
              token: auth.token,
              id: selectedTransaction?.t_id,
            });
          },
        },
      ],
      {cancelable: true},
    );
  };
  const handleUpdate = () => {
    if (invoiceTitle == '') {
      setTitleError(true);
      return;
    }
    console.log(emailNotification, mobileNotification, smsNotification);
    updateSavedTransactionMutation(updateTransaction, {
      token: auth.token,
      title: invoiceTitle,
      mobileNotification: mobileNotification ? '1' : '0',
      smsNotification: smsNotification ? '1' : '0',
      mailNotification: emailNotification ? '1' : '0',
      id: selectedTransaction?.t_id,
    });
  };

  const handleQuery = () => {
    fetchSubscriptionMutation(invoiceInquiry, {
      token: auth.token,
      subscriberNumber: selectedTransaction?.t_abone_no,
      queryType: 'AboneNo',
      company: selectedTransaction?.t_kurum,
    });
  };

  const RenderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{marginBottom: 10}}
        onPress={() => {
          setSelectedTransaction(item);
          actionModalizRef.current?.open();
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
            paddingBottom: 10,
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#2c3e50',
              borderRadius: 25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text size={15} medium color="white">
              {item?.t_kurum?.substring(0, 2)}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 10,
              flex: 1,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text size={12} medium color="black">
                {item?.t_kurum}
              </Text>
              <Text size={12} medium color="black">
                {item?.t_baslik}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text size={12} light color="black">
                {moment(item?.t_tarih).format('DD.MM.YYYY')}
              </Text>
              <Text size={12} bold color="black">
                {item.t_abone_no}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Spinner visible={loading || deleteSavedTransactionMutationLoading} />
      <Portal>
        <Modalize
          ref={updateModaliRef}
          snapPoint={Dimensions.get('window').height - getStatusBarHeight()}>
          {selectedTransaction && (
            <View style={{marginTop: 10, padding: 10}}>
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
              <TouchableOpacity
                style={styles.resultButton}
                onPress={handleUpdate}>
                {updateSavedTransactionMutationLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text bold color="white">
                    Kaydet
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Modalize>
      </Portal>
      <Portal>
        <Modalize ref={modalizeRef} snapPoint={460}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              height: 460,
            }}>
            <LottieView
              source={require('@/assets/animation/error.json')}
              autoPlay={true}
              loop={false}
              style={{width: 200, height: 200}}
            />
            <Text
              bold
              align="center"
              size={13}
              color="#484848"
              style={{marginVertical: 10}}>
              {data && data[0].mesaj}
            </Text>
            <Button
              style={{marginVertical: 5, width: '80%'}}
              borderRadius={5}
              backgroundColor={colors.primary}
              label="Tamam"
              onPress={() => {
                modalizeRef.current?.close();
              }}
            />
          </View>
        </Modalize>
      </Portal>
      <Spinner visible={false} />
      <SafeAreaView style={{flex: 1, padding: 10, backgroundColor: 'white'}}>
        <View style={{padding: 20}}>
          <View
            style={{
              backgroundColor: colors.red,
              padding: 10,
              borderRadius: 10,
              marginVertical: 10,
            }}>
            <Text  size={12} regular color="white">
              İşlem yapmak istediğiniz kaydı seçerek işlem yapabilirsiniz.
            </Text>
          </View>
        </View>
        <FlatList
          data={savedTransactionQueryData?.length > 0 && savedTransactionQueryData[0].sonuc !== "400" ? savedTransactionQueryData : []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <RenderItem item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 20}}
          refreshControl={
            <RefreshControl refreshing={savedTransactionQueryLoading} onRefresh={getSavedTransactions} />
          }
          ListEmptyComponent={() => (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Empty title="Görüntülenecek kayıt bulunmamaktadır." />
            </View>
          )}
        />
      </SafeAreaView>
      <Portal>
        <Modalize ref={actionModalizRef} snapPoint={300}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
            }}>
            <Button
              style={{marginVertical: 5, width: '80%'}}
              borderRadius={5}
              backgroundColor={colors.success}
              label="Güncelle"
              onPress={() => {
                actionModalizRef.current?.close();
                setSelectedTransaction(selectedTransaction);
                setInvoiceTitle(selectedTransaction?.t_baslik);
                setEmailNotification(
                  selectedTransaction?.t_bildirim_mail == '1' ? true : false,
                );
                setMobileNotification(
                  selectedTransaction?.t_bildirim_mobil == '1' ? true : false,
                );
                setSmsNotification(
                  selectedTransaction?.t_bildirim_sms == '1' ? true : false,
                );
                updateModaliRef.current?.open();
              }}
            />
            <Button
              style={{marginVertical: 5, width: '80%'}}
              borderRadius={5}
              backgroundColor={colors.red}
              label="Sil"
              onPress={() => {
                handleDelete();
                actionModalizRef.current?.close();
              }}
            />

            <Button
              style={{marginVertical: 5, width: '80%'}}
              borderRadius={5}
              backgroundColor={colors.primary}
              label="Sorgula"
              onPress={() => {
                handleQuery();
              }}
            />
          </View>
        </Modalize>
      </Portal>
      <Portal>
        <Modalize ref={handleActionModalizeRef} snapPoint={350}>
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
              style={{width: 200, height: 200}}
            />
            <Text medium align="center" size={18} color="#484848">
              {message}
            </Text>
            <Button
              style={{marginVertical: 5, width: '80%'}}
              backgroundColor={colors.primary}
              label="Tamam"
              onPress={() => {
                handleActionModalizeRef.current?.close();
                getSavedTransactions();
              }}
            />
          </View>
        </Modalize>
      </Portal>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  icon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.8,
    marginHorizontal: Dimensions.get('window').width * 0.1,
  },
  item: {
    marginVertical: 10,
    borderBottomWidth: 1,
    width: '100%',
    paddingVertical: 10,
    borderColor: colors.borderColor,
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    marginLeft: 10,
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
export default SavedTransaction;
