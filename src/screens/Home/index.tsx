//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Home';
import InvoicePaymentNavigation from '../InvoicePayment';
import BlogDetail from './BlogDetail';
import Dealers from './Dealers';
import SavedTransaction from './SavedTransaction';
import AddSavedTransaction from '../InvoicePayment/AddSavedTransaction';
import SubscriptionInquiryResult from '../InvoicePayment/SubscriptionInquiryResult';
import DijiyonPayment from './DijiyonPayment';
import Application from './Application';
import ApplicationDetail from './ApplicationDetail';
import ProfileNavigation from '../Profile';
// create a component
const HomeNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        options={{
          animation: 'fade_from_bottom',
        }}
        name="BlogDetail"
        component={BlogDetail}
      />
      <Stack.Screen
        options={{
          
        }}
        name="InvoicePaymentNavigation"
        component={InvoicePaymentNavigation}
      />
      <Stack.Screen
        name="SubscriptionInquiryResult"
        component={SubscriptionInquiryResult}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          title: 'En Yakın Faturamatik',
        }}
        name="Dealers"
        component={Dealers}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Kayıtlı İşlemler',
        }}
        name="SavedTransaction"
        component={SavedTransaction}
      />
      <Stack.Screen
        name="AddSavedTransaction"
        component={AddSavedTransaction}
      />
      <Stack.Screen name="DijiyonPayment" component={DijiyonPayment} />
      <Stack.Screen
        name="Application"
        component={Application}
      />
      <Stack.Screen
        name="ApplicationDetail"
        component={ApplicationDetail}
      />
      <Stack.Screen
        name="ProfileNavigation"
        component={ProfileNavigation}
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
export default HomeNavigation;
