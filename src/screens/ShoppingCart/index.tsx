//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InvoicePaymentNavigation from '../InvoicePayment';
import ShoppingCartPage from './ShoppingCart';
import CardForm from './CardForm';
// create a component
const ShoppingCartNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="ShoppingCart" component={ShoppingCartPage} />
            <Stack.Screen name="CardForm" component={CardForm} />     
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
export default ShoppingCartNavigation;
