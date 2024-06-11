//import liraries
import FaturamatikApp from '@/Faturamatik';
import {NavigationContainer} from '@react-navigation/native';
import React, {Component, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, Alert, Linking} from 'react-native';
import LoginScreen from '@/screens/Auth/Login';
import {Button} from 'react-native-ui-lib';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from '@/screens/Auth/Register';
import TwoFactorScreen from '@/screens/Auth/TwoFactor';
import {useAuth} from './contexts/auth/Context';
import {LoadingProvider} from './contexts/loading/Context';
import RegisterStep2 from './screens/Auth/RegisterStep2';
import WebViewPage from './screens/ShoppingCart/WebViewPage';
import SuccessTransaction from './screens/ShoppingCart/SuccessTransaction';
import ForgotPassword from './screens/Auth/ForgotPassword';
import PasswordTwoFactor from './screens/Auth/PasswordTwoFactor';
import ChangePassword from './screens/Auth/ChangePassword';
import AppIntro from './screens/Intro/Intro';
//@ts-ignore
import VersionCheck from 'react-native-version-check';
import analytics from '@react-native-firebase/analytics';

// create a component
const AuthenticatePage = () => {
  const auth = useAuth();

  const Stack = createNativeStackNavigator();

  const checkUpdateNeeded = async () => {
    let updateNeeded = await VersionCheck.needUpdate();

    if (updateNeeded.isNeeded) {
      Alert.alert(
        'Güncelleme',
        'Yeni bir güncelleme mevcut. Lütfen güncellemeyi yapınız.',
        [
          {
            text: 'Güncelle',
            onPress: () => {
              Linking.openURL(updateNeeded.storeUrl);
            },
          },
        ],
      );
    } else {
      console.log('Güncelleme gerekmiyor');
    }
  };

  useEffect(() => {
    checkUpdateNeeded();
  }, []);

  const routeNameRef = React.useRef<any>();
  const navigationRef = React.useRef<any>();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          console.log('s', currentRouteName);
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator initialRouteName="Intro">
        {/* <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="Intro" component={AppIntro} />
        </Stack.Group> */}

        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="TwoFactor" component={TwoFactorScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen options={{ 
            
           }} name="RegisterStep2" component={RegisterStep2} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen
            name="PasswordTwoFactor"
            component={PasswordTwoFactor}
          />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Group>

        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
            }}
            name="Faturamatik"
            component={FaturamatikApp}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
            }}
            name="WebViewPage"
            component={WebViewPage}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
            }}
            name="SuccessTransaction"
            component={SuccessTransaction}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
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
export default AuthenticatePage;
