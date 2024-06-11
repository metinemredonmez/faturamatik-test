//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ViewStyle,StyleProp } from 'react-native';

export interface Props {
    shadow?: boolean;
    flex?: number;
    row?: boolean;
    column?: boolean;
    center?: boolean;
    middle?: boolean;
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
    card?: boolean;
    shadowColor?: string;
    color?: string;
    space?: string;
    padding?: string;
    wrap?: boolean;
    style?: StyleProp<ViewStyle>;
    children?: any;
    animated?: boolean;
}

// create a component
const Block = () => {
    return (
        <View style={styles.container}>
            <Text>Block</Text>
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
export default Block;
