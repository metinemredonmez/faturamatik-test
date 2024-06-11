//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import InvoicePaymentNavigation from '../InvoicePayment';
import TransactionPage from './Transaction';
import TransactionDetail from './TransactionDetail';
import ReceipDetail from './ReceiptDetail';
// create a component
const TransactionNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TransactionPage" component={TransactionPage} />
      <Stack.Screen name="ReceiptDetail" component={ReceipDetail} />
      <Stack.Screen
        name="TransactionDetail"
        options={{
          
          animation: 'fade_from_bottom',
        }}
        component={TransactionDetail}
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
export default TransactionNavigation;
