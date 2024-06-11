//import liraries
import {useBasket} from '@/contexts/basket/Context';
import {useLoading} from '@/contexts/loading/Context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {Component, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, Image} from 'react-native';
import {Button, Text} from 'react-native-ui-lib';

// create a component
const SuccessTransaction = () => {
  const navigation = useNavigation();
  const basket = useBasket();
  const loader = useLoading();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loader.setLoading(false);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text text40BO>Fatura ödemeniz başarıyla gerçekleşmiştir.</Text>
        <Text text80BO marginT-20>
          Ödediğiniz faturaları görüntülemek için hareketler sayfasına
          tıklayabilirsiniz.
        </Text>
        <Image
          source={require('@/assets/images/check.png')}
          style={{
            width: 300,
            height: 500,
            marginTop: 10,
            resizeMode: 'contain',
          }}
        />
        <Button
          style={{
            width: '100%',
            height: 50,
            backgroundColor: '#1E232C',
            borderRadius: 5,
          }}
          text70BO
          label="Uygulamaya Dön"
          onPress={() => {
            basket.setBasket(0);
            navigation.navigate('HomeScreen', {
              initialScreen: 'HomeScreen',
            });
          }}
        />
      </SafeAreaView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
});

//make this component available to the app
export default SuccessTransaction;
