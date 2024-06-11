//import liraries
import {sendMailReceipt} from '@/api/payment';
import {Text} from '@/components';
import Header from '@/components/Header/Header';
import {colors} from '@/config';
import {useAuth} from '@/contexts/auth/Context';
import useFetch from '@/hooks/useFetch';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import LottieView from 'lottie-react-native';
import React, {Component, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Host, Portal} from 'react-native-portalize';
import {Button} from 'react-native-ui-lib';
import PDFView from 'react-native-view-pdf';

// create a component
const ReceipDetail = () => {
  const auth = useAuth();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const receiptUrl = route.params?.item[0].makbuz_url;
  const [loading, setLoading] = React.useState(true);
  const receiptRef = useRef<any>(null);
  const errorRef = useRef<any>(null);

  const [
    receiptMutation,
    {
      data: receiptMutationData,
      loading: receiptMutationLoading,
      error: receiptMutationError,
    },
  ] = useFetch<any>();

  const handleSendMail = () => {
    console.log(route.params?.item);
    receiptMutation(sendMailReceipt, {
      token: auth?.token,
      orderId: route.params?.orderId,
      url: route.params?.item[0].makbuz_url,
    });
  };

  useEffect(() => {
    if (receiptMutationData) {
      console.log(receiptMutationData);
      if (receiptMutationData[0].sonuc == "400") {
        errorRef.current?.open();
      } else {
        receiptRef.current?.open();
      }
    }
  }, [receiptMutationData]);

  return (
    <View style={styles.container}>
      <Portal>
        <Modalize ref={receiptRef} snapPoint={400}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              height: '100%',
            }}>
            <LottieView
              source={require('@/assets/animation/success.json')}
              autoPlay={true}
              loop={false}
              style={{width: 200, height: 200}}
            />
            <Text medium align="center" size={13} color="#484848">
              {receiptMutationData && receiptMutationData[0].mesaj}
            </Text>
            <Button
              style={{marginVertical: 5, width: '80%'}}
              backgroundColor={colors.primary}
              label="Tamam"
              onPress={() => {
                receiptRef.current?.close();
              }}
            />
          </View>
        </Modalize>
        <Modalize ref={errorRef} snapPoint={400}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              height: '100%',
            }}>
            <LottieView
              source={require('@/assets/animation/error.json')}
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
                receiptRef.current?.close();
              }}
            />
          </View>
        </Modalize>
      </Portal>
      <SafeAreaView style={styles.safeAreaView}>
        <Header
          title="Makbuz Detayı"
          leftSide={true}
          rightSide={
            <View style={{flexDirection: 'row'}}>
              <Text style={{marginRight: 10}}>
                <Icon type="feather" name="share" size={25} />
              </Text>
            </View>
          }
        />
        <TouchableOpacity style={styles.mailButton} onPress={handleSendMail}>
          <Text style={{color: 'white'}}>MAİL OLARAK GÖNDER</Text>
        </TouchableOpacity>
        {loading && (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
        <PDFView
          style={styles.pdf}
          onLoad={() => setLoading(false)}
          resource={receiptUrl}
          resourceType="url"
        />
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
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  mailButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E232C',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});

//make this component available to the app
export default ReceipDetail;
