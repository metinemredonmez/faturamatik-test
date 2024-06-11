//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';


export interface Props {
    loading: boolean;
}

// create a component
const Loading = (
    props: Props,
) => {
    return (
        <View style={{ 
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#2c3e50',
            position: 'absolute',
            top: 0,
            left: 0,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            zIndex: 9999,
            
         }}>
            <Text>Loading</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        position: 'absolute',
        top: 0,
        left: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 9999,
    },
});

//make this component available to the app
export default Loading;
