//import liraries
import AuthenticatePage from '@/Authenticate';
import {AuthProvider} from '@/contexts/auth/Context';
import {BasketProvider} from '@/contexts/basket/Context';
import {LoadingProvider} from '@/contexts/loading/Context';
import React, {Component, useEffect, useState} from 'react';

import {NotifierWrapper, NotifierRoot} from 'react-native-notifier';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
//@ts-ignore
import AnimatedSplash from 'react-native-animated-splash-screen';
import {Dimensions, ImageBackground, Platform, StatusBar} from 'react-native';
import {Host} from 'react-native-portalize';
import {NotificationProvider} from '@/contexts/notification/Context';
import codePush from 'react-native-code-push';
import { colors } from '@/config';

// create a component

const codePushOptions = {
  installMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: false,
};

const App = () => {
  const ref = React.useRef(null);

  const [loaded, setLoaded] = useState(false);



  const checkUpdate = () => {
    codePush.sync(
      {
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      status => {       
        switch (status) {
          case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            console.log('DOWNLOADING_PACKAGE');
            break;
          case codePush.SyncStatus.INSTALLING_UPDATE:
            console.log('INSTALLING_UPDATE');
            break;
          case codePush.SyncStatus.UPDATE_INSTALLED:
            codePush.restartApp();
            break;
          case codePush.SyncStatus.UP_TO_DATE:
            console.log('UP_TO_DATE');
            break;
          case codePush.SyncStatus.UPDATE_IGNORED:
            console.log('UPDATE_IGNORED');
            break;
          case codePush.SyncStatus.UPDATE_INSTALLED:
            console.log('UPDATE_INSTALLED');
            break;
          case codePush.SyncStatus.UNKNOWN_ERROR:
            console.log('UNKNOWN_ERROR');
            break;
        }
      },
    );
  };

  useEffect(() => {
    checkUpdate();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1,backgroundColor:colors.bgColor}}>
      {/* <StatusBar hidden={Platform.OS === 'android'} /> */}
      <AnimatedSplash
        translucent={true}
        isLoaded={loaded}
        logoImage={require('@/assets/images/loading-logo.png')}
        backgroundColor={'white'}
        logoHeight={200}
        logoWidth={Dimensions.get('window').width - 30}>
        <Host>
          <NotifierWrapper>
            <NotifierRoot ref={ref} />
            <AuthProvider>
              <LoadingProvider>
                <BasketProvider>
                  <NotificationProvider>
                    <AuthenticatePage />
                  </NotificationProvider>
                </BasketProvider>
              </LoadingProvider>
            </AuthProvider>
          </NotifierWrapper>
        </Host>
      </AnimatedSplash>
    </GestureHandlerRootView>
  );
};
//make this component available to the app
export default codePush(codePushOptions)(App);
