//import liraries
import React, {Component, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Animated} from 'react-native';

import {Text} from './components';
import Header from './components/Header/Header';
import TabNavigation from './Tab';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useAuth} from './contexts/auth/Context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useBasket} from './contexts/basket/Context';
import {useLoading} from './contexts/loading/Context';
import {Toast} from 'react-native-ui-lib';
import {Notifier} from 'react-native-notifier';
import { Host } from 'react-native-portalize';
import { colors } from './config';

// create a component
const FaturamatikApp = () => {
  const auth = useAuth();
  const navigation = useNavigation();
  const basket = useBasket();
  const loading = useLoading();
  const [showError, setShowError] = React.useState(false);

  const getContainerStyleBottomPosition = (translateY: Animated.Value) => ({
    // unset "top" property that was used in default styles
    top: undefined,
    // add bottom margin
    bottom: 10,
    transform: [
      {
        // reverse translateY value
        translateY: translateY.interpolate({
          inputRange: [-1000, 0],
          outputRange: [1000, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  });

  axios.interceptors.request.use(async config => {
    return config;
  });

  axios.interceptors.response.use(async response => {
    if (response.data?.length > 0 && response.data[0].sonuc == '401') {
      auth.logout();
      navigation.navigate('Login');
      Notifier.showNotification({
        title: 'Hata',
        description:
          'Uzun süre işlem yapmadığınız için oturumunuz sonlandırıldı.',
        duration: 3000,
        showAnimationDuration: 300,
        onHidden: () => console.log('Hidden'),
        onPress: () => console.log('Press'),
        hideOnPress: true,
        containerStyle: getContainerStyleBottomPosition,
      });
      loading.setLoading(false);
    } else {
    }
    return response;
  });

  useEffect(() => {
    if (!auth?.token) {
      loading.setLoading(false);
      navigation.navigate('Login');
    } else {
      // loading.setLoading(false);
      // navigation.navigate('Faturamatik');
    }
  }, [auth?.token]);

  return (
    <View style={{flex: 1,backgroundColor:colors.bgColor}}>
      <Host>
        <TabNavigation />
      </Host>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default FaturamatikApp;
