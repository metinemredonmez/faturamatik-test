//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import InvoicePaymentNavigation from '../InvoicePayment';
import ProfilePage from './Profile';
import NotificationSettings from './NotificationSettings';
import AccountSettings from './AccountSettings';
import ChangePassword from './ChangePassword';
import AboutPage from './About';
import PrivacyPolicy from './PrivacyPolicy';
// create a component
const ProfileNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfilePage} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="About" component={AboutPage} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen
        name="NotificationSettings"
        options={{

        }}
        component={NotificationSettings}
      />
    </Stack.Navigator>
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
export default ProfileNavigation;
