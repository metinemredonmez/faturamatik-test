//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InvoicePaymentScreen from './InvoicePayment';
import CompanyList from './CompanyList';
import SubscriptionInquiry from './SubscriptionInquiry';
import SubscriptionInquiryResult from './SubscriptionInquiryResult';
// create a component
const InvoicePaymentNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="InvoicePayment" component={InvoicePaymentScreen} />
            <Stack.Screen name="CompanyListNavigation" component={CompanyList} /> 
            <Stack.Screen name="SubscriptionInquiry" component={SubscriptionInquiry} /> 
            <Stack.Screen name="SubscriptionInquiryResult" component={SubscriptionInquiryResult} /> 
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
export default InvoicePaymentNavigation;
