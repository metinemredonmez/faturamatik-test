//import liraries
import {Text} from '@/components';
import Header from '@/components/Header/Header';
import {colors} from '@/config';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Card, TouchableOpacity} from 'react-native-ui-lib';
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

// create a component
const SubscriptionInquiryResult = ({
  route,
  navigation,
}: NativeStackScreenProps<any>) => {
  console.log('params', route.params);
  const [selectedInvoices, setSelectedInvoices] = useState<any[]>([]);

  const [
    addBasketMutation,
    {
      data: addBasketMutationData,
      error: addBasketMutationError,
      loading: addBasketMutationLoading,
    },
  ] = useFetch<any>();

  const [
    listBasketMutation,
    {
      data: listBasketMutationData,
      error: listBasketMutationError,
      loading: listBasketMutationLoading,
    },
  ] = useFetch<any>();

  const basket = useBasket();
  const auth = useAuth();

  const addItem = () => {
    addBasketMutation(addBasket, {
      token: auth?.token,
      invoices: selectedInvoices,
    });
  };

  useEffect(() => {
    if (addBasketMutationError) {
      console.log(addBasketMutationError);
    }
  }, [addBasketMutationError]);

  useEffect(() => {
    if (addBasketMutationData) {
      if (addBasketMutationData[0].sonuc == 200) {
        Notifier.showNotification({
          title: 'Başarılı',

          description: addBasketMutationData[0].mesaj,
          Component: NotifierComponents.Notification,
          componentProps: {
            titleStyle: {
              fontFamily: 'Poppins-Bold',
              fontWeight: '600',
              fontSize: 13,
            },
            descriptionStyle: {
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
            },
            imageSource: require('@/assets/png-icon/check.png'),
          },
        });

        listBasketMutation(listBaskets, {
          token: auth?.token,
        });
      }
    }
  }, [addBasketMutationData]);

  useEffect(() => {
    if (listBasketMutationError) {
      console.log(listBasketMutationError);
    }
  }, [listBasketMutationError]);

  useEffect(() => {
    if (listBasketMutationData) {
      // console.log(listBasketMutationData[0].fatura_bilgileri.length);
      basket.setBasket(listBasketMutationData[0].fatura_bilgileri.length);
      // basket.setBasket();
    }
  }, [listBasketMutationData]);

  const ref = React.useRef(null);

  return (
    <View style={styles.container}>
      <NotifierRoot ref={ref} />
      <SafeAreaView style={{margin: 10, backgroundColor: 'white'}}>
        <Header title="Faturalar" leftSide />
        <ScrollView contentContainerStyle={{ paddingBottom:50 }}>
          <View style={styles.invoiceInfoContainer}>
            <View style={{flexDirection: 'column'}}>
              <Text color="#484848" size={15} semibold>
                {route.params?.company.KurumTuru}
              </Text>
              <Text color="#484848" size={14} regular>
                {route.params?.company.KurumAdi}
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
                  {route.params?.invoices[0].AboneAdi}
                </Text>
                <Text color="#484848" size={12} semibold>
                  {route.params?.invoices[0].AboneNo}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'column', marginTop: 20}}>
              <Text color="#484848" size={15} semibold>
                Fatura Seçimi
              </Text>
              <View
                style={{
                  backgroundColor: colors.red,
                  padding: 10,
                  borderRadius: 10,
                  marginVertical: 10,
                }}>
                <Text color="#484848" size={12} regular color="white">
                  Ödemek İstediğiniz Faturaları faturaya tıklayarak
                  seçebilirsiniz.
                </Text>
              </View>
            </View>
            <ScrollView
              style={styles.invoiceItemContainer}
              contentContainerStyle={{paddingBottom: 50}}>
              {route.params?.invoices.map((invoice: any, index: number) => (
                <InvoiceItem
                  key={index}
                  item={invoice}
                  selected={selectedInvoices.includes(invoice)}
                  onPress={() => {
                    if (selectedInvoices.includes(invoice)) {
                      setSelectedInvoices(
                        selectedInvoices.filter(item => item != invoice),
                      );
                    } else {
                      setSelectedInvoices([...selectedInvoices, invoice]);
                    }
                  }}
                />
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => addItem()}
              disabled={selectedInvoices.length == 0}
              style={{
                ...styles.resultButton,
                opacity: selectedInvoices.length == 0 ? 0.5 : 1,
              }}>
              {addBasketMutationLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text bold color="white">
                  Devam Et ({selectedInvoices.length} Fatura)
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.resultButton,
                backgroundColor: colors.primary,
                marginTop: 10,
              }}
              onPress={() => {
                navigation.navigate('AddSavedTransaction', {
                  subscriptionName: route.params?.invoices[0].AboneAdi,
                  subscriptionNumber: route.params?.invoices[0].AboneNo,
                  queryType: 'AboneNo',
                  company: route.params?.company.KurumKodu,
                  category: route.params?.company.KurumTuru,
                });
              }}>
              <Text size={15} color="white" medium>
                Kayıtlı Faturalara Ekle
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  invoiceInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  invoiceItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
  },
  invoiceItem: {
    display: 'flex',
    borderWidth: 0.5,
    borderColor: '#E8ECF4',

    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  resultButton: {
    width: '100%',
    height: 56,
    backgroundColor: colors.success,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//make this component available to the app
export default SubscriptionInquiryResult;
