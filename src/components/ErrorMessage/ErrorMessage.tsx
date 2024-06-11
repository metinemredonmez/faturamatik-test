//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '..';
import { Icon } from '@rneui/themed';

// create a component

export interface ErrorMessageProps {
    title: string;
    description: string;
    buttons?:any;
    visible?:boolean;
}

const ErrorMessage = (props:ErrorMessageProps) => {
    return (
        <View style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: props.visible ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            width: '100%',
            height: '100%',
            
         }}>
            <View style={{ 
                width: '80%',
                
                backgroundColor: 'white',
                borderRadius: 10,
                display: 'flex',
                
                opacity: 1,
                padding:10

             }}>
                <View style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"center" }}>
                    <View style={{ width:50,height:50,borderRadius:30,backgroundColor:"#F44336",marginTop:-30,display:"flex",alignItems:"center",justifyContent:"center" }}>
                        <Icon name="warning" color="white" />
                    </View>

                </View>
                <Text size={13} medium color="#F44336">
                    {props.title}
                </Text>
                <Text size={12} medium color="#484848">
                    {props.description}
                </Text>
                <View>
                    {props.buttons}
                </View>
            </View>
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
export default ErrorMessage;
