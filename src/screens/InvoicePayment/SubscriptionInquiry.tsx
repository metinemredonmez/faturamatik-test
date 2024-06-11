//import liraries
import {invoiceInquiry} from '@/api/payment';
import {Text} from '@/components';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Header from '@/components/Header/Header';
import {colors} from '@/config';
import {useAuth} from '@/contexts/auth/Context';
import {useLoading} from '@/contexts/loading/Context';
import useFetch from '@/hooks/useFetch';
import {NavigationProp} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// create a component
const SubscriptionInquiry = ({
  navigation,
  route,
}: NativeStackScreenProps<any | 'SubscriptionInquiry'>) => {
  const loader = useLoading();
  const auth = useAuth();

  const company = route.params?.company;

  const [subscriptionNo, setSubscriptionNo] = useState('');

  const [fetchSubscriptionMutation, {data, error, loading}] = useFetch<any>();

  const [errorVisible, setErrorVisible] = useState(false);

  const fetchSubscription = () => {
    fetchSubscriptionMutation(invoiceInquiry, {
      token: auth.token,
      subscriberNumber: subscriptionNo,
      queryType: 'AboneNo',
      company: company.KurumKodu,
    });
  };

  useEffect(() => {
    if (data) {
      if (data[0].faturalar.length == 0) {
        setErrorVisible(true);
      } else {
        navigation.navigate('SubscriptionInquiryResult', {
          company,
          subscriptionNo,
          invoices: data[0].faturalar,
        });
      }
    }
  }, [data]);

  return (
    <View style={styles.container}>
      {errorVisible && (
        <ErrorMessage
          title="Hata"
          visible={errorVisible}
          description={data[0].mesaj}
          buttons={
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
                  Tamam
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
      <SafeAreaView style={{flex: 1, backgroundColor: 'white', margin: 10}}>
        <Header title={company.KurumAdi} leftSide />
        <View style={{marginVertical: 10}}>
          <TextInput
            value={subscriptionNo}
            returnKeyLabel="Bitti"
            returnKeyType="done"
            keyboardType="number-pad"
            placeholderTextColor="#8391A1"
            placeholder="Abone No"
            style={styles.input}
            onChange={e => setSubscriptionNo(e.nativeEvent.text)}
          />
          <Text size={12} color="gray" style={{marginVertical: 5}}>
            {company.Yardim}
          </Text>
          <TouchableOpacity
            style={styles.resultButton}
            onPress={fetchSubscription}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text bold color="white">
                Sorgula
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
export default SubscriptionInquiry;
