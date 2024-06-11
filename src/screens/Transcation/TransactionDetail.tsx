//import liraries
import {createReceiptQuery} from '@/api/payment';
import {Text} from '@/components';
import Header from '@/components/Header/Header';
import {colors} from '@/config';
import {useAuth} from '@/contexts/auth/Context';
import useFetch from '@/hooks/useFetch';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import React, {Component, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Host, Portal} from 'react-native-portalize';
import {Button, Card} from 'react-native-ui-lib';

// create a component
const TransactionDetail = ({
  navigation,
  route,
}: NativeStackScreenProps<any | 'TransactionDetail'>) => {
  const item = route.params?.item;
  const auth = useAuth();
  const successRef = React.useRef<any>(null);
  const errorRef = React.useRef<any>(null);

  const [receiptMutation, {data: receiptMutationData, loading, error}] =
    useFetch<any>();

  const createReceipt = () => {
    receiptMutation(createReceiptQuery, {
      token: auth?.token,
      orderId: item?.t_odeme_id,
    });
  };

  useEffect(() => {
    if (receiptMutationData) {
      if (receiptMutationData[0].sonuc == 400) {
        errorRef.current?.open();
      }
      else {
        successRef.current?.open();
      }
    }
  }, [receiptMutationData]);

  return (
    
      <View style={styles.container}>
        <Portal>
          <Modalize ref={successRef} snapPoint={300}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                height:"100%"
              }}>
              <LottieView
                source={require('@/assets/animation/success.json')}
                autoPlay={true}
                loop={false}
                style={{width: 200, height: 200}}
              />
              <Text medium align="center" size={13} color="#484848">
                {receiptMutationData && receiptMutationData[0].aciklama}
              </Text>
              <Button
                style={{marginVertical: 5, width: '80%'}}
                backgroundColor={colors.primary}
                label="Makbuzu görüntüle"
                onPress={() => {
                  successRef.current?.close();
                  navigation.navigate('ReceiptDetail', {
                    item: receiptMutationData,
                    orderId: item?.t_odeme_id,
                  });
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
                height:"100%"
              }}>
              <LottieView
                source={require('@/assets/animation/error.json')}
                autoPlay={true}
                loop={false}
                style={{width: 200, height: 200}}
              />
              <Text medium align="center" size={12} color="#484848">
                {receiptMutationData && receiptMutationData[0].aciklama}
              </Text>
              <Button
                style={{marginVertical: 5, width: '80%'}}
                backgroundColor={colors.primary}
                label="Tamam"
                onPress={() => {
                  errorRef.current?.close();
                }}
              />
            </View>
          </Modalize>
        </Portal>
        <SafeAreaView style={{flex: 1, margin: 10, backgroundColor: 'white'}}>
          <Header title="Hareket Detayı" leftSide={true} />
          <View
            style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text size={15} medium selectable>
              {item?.t_odeme_id}
            </Text>
            <Text size={15} medium>
              {moment(item?.t_tarih).format('DD.MM.YYYY HH:mm')}
            </Text>
          </View>
          <Card enableShadow style={{padding: 10, marginTop: 20}}>
            <View>
              <View style={{marginTop: 20}}>
                <View style={styles.item}>
                  <Text size={15} regular>
                    Taksit Sayısı{' '}
                  </Text>
                  <Text size={15} semibold>
                    {item?.t_taksit_sayisi}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text size={15} regular>
                    Toplam Fatura Tutarı
                  </Text>
                  <Text size={15} semibold>
                    {item?.t_hizmet_tutari} TL
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text size={15} regular>
                    Pos Komisyon
                  </Text>
                  <Text size={15} semibold>
                    {item?.t_pos_komisyon} TL
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text size={15} regular>
                    Hizmet Bedeli
                  </Text>
                  <Text size={15} semibold>
                    {item.t_hizmet_bedeli} TL
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text size={15} regular>
                    Ödeme Tutarı
                  </Text>
                  <Text size={15} semibold>
                    {item.t_odeme_tutari} TL
                  </Text>
                </View>

                {/* <View style={{ width:"100%" }}>
            <Button label="Faturaları Gör" backgroundColor="#414141" labelStyle={{ 
                color: "white",
                fontSize: 15,
                fontWeight: "bold"
             }} color="white" borderRadius={5} />
        </View> */}
              </View>
              <TouchableOpacity
                onPress={createReceipt}
                style={styles.loginButton}>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text size={15} medium color="white">
                    Makbuz Oluştur
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </Card>
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
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
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
export default TransactionDetail;
