//import liraries
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-ui-lib';
import WebView, {WebView as RNWebView} from 'react-native-webview';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useAuth} from '@/contexts/auth/Context';
import useFetch from '@/hooks/useFetch';
import {checkPayment} from '@/api/payment';
import {useLoading} from '@/contexts/loading/Context';
// create a component

interface WebViewProps {
  url: string;
}

const WebViewPage = (props: WebViewProps) => {
  const auth = useAuth();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const loading = useLoading();
  const [
    checkPaymentMutation,
    {
      data: checkPaymentData,
      loading: checkPaymentLoading,
      error: checkPaymentError,
    },
  ] = useFetch<any>();

  const {url, OrderId} = route.params;

  console.log('url_order', url, OrderId);

  const [visible, setVisible] = useState(false);

  const onUrlChange = (webViewState: any) => {
    const {url} = webViewState;
    if (url.includes('https://crm.ortakmarketim.com/odeme-sonuc.php?')) {
      checkPaymentMutation(checkPayment, {
        OrderId: OrderId,
        token: auth?.token,
      });
    }
  };

  useEffect(() => {
    if (checkPaymentData) {
      if (checkPaymentData[0].IsDone == false) {
        navigation.navigate('CardForm', {
          error: checkPaymentData[0].Message,
        });
      } else {
        navigation.navigate('SuccessTransaction');
      }
    }
  }, [checkPaymentData]);

  useEffect(() => {
    if (checkPaymentError) {
      console.log('checkPaymentError', checkPaymentError);
    }
  }, [checkPaymentError]);

  useEffect(() => {
    if (checkPaymentLoading) {
      loading.setLoading(true);
    } else {
      loading.setLoading(false);
    }
  }, [checkPaymentLoading]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{padding: 10, fontSize: 16}}>Geri</Text>
      </TouchableOpacity>
      <WebView
        style={{
          flex: 1,
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
          display: visible ? 'none' : 'flex',
        }}
        //Loading URL
        source={{uri: route.params.url}}
        //Enable Javascript support
        javaScriptEnabled={true}
        //For the Cache
        domStorageEnabled={true}
        onLoadStart={() => setVisible(true)}
        onLoad={() => setVisible(false)}
        onNavigationStateChange={onUrlChange}
      />
      {visible ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});

//make this component available to the app
export default WebViewPage;
