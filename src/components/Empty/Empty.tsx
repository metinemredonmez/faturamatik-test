//import liraries
import React, { Component } from 'react';
import { View,  StyleSheet, Image } from 'react-native';
import { Text } from '..';

import AnimatedLotieView from 'lottie-react-native';

// create a component
const Empty = ({
    title
}:any) => {
    return (
        <View style={{ height:'80%', alignItems: "center", justifyContent: "center" }}>
            <AnimatedLotieView
              source={require('@/assets/animation/empty_basket.json')}
              autoPlay
              loop
              style={{
                width: 200,
                height: 200,

              }}
            />
            <Text bold>
              {title}
            </Text>
          </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 200,
        display: 'flex',
        marginTop:100
    },
    image:{
        width: 200,
        height: 200,
        resizeMode: 'contain'
    }
});

//make this component available to the app
export default Empty;
