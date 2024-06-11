//import liraries
import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  Alert,
  Keyboard,
  StyleSheet,
} from 'react-native';
import styles from './Style';
import {Text, Text as TextComponent} from '@/components';
import {Card} from 'react-native-ui-lib';
import {colors, sizes} from '@/config';
import Header from '@/components/Header/Header';
import Slider from './Slider';
import MenuComponent from './Menu';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
//@ts-ignore
import messaging from '@react-native-firebase/messaging';

import {
  Notifier,
  NotifierComponents,
  NotifierRoot,
} from 'react-native-notifier';
import {useAuth} from '@/contexts/auth/Context';
import moment from 'moment';
import BlogItem from './BlogItem';
import useFetch from '@/hooks/useFetch';
import {posts, slider} from '@/api/blog';
import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-tracking-transparency';
import {TextInput} from 'react-native-gesture-handler';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';
import axios from 'axios';
import { dijiyonApiUrl } from '@/api';

// create a component
const DijiyonPayment = ({navigation, route}: any) => {
  const [subscriber, setSubscriber] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<boolean>(false);
  const auth = useAuth();
  const errorRef = useRef<any>(null);
  const [
    dijiyonPaymentQuery,
    {
      data: dijiyonPaymentData,
      loading: dijiyonPaymentLoading,
      error: dijiyonPaymentError,
    },
  ] = useFetch<any>();

  const styles = StyleSheet.create({
    input: {
      borderWidth: 0.5,
      color: '#484848',
      backgroundColor: '#F7F8F9',
      height: 56,
      padding: 10,
      borderRadius: 5,
      fontFamily: 'Poppins-Medium',
      fontSize: 14,
      borderColor: '#E8ECF4',
      width: '100%',
      marginTop:10,
    },
  });

  const fetchDijiyonPayment = async () => {
    
  }

  return (
    <View style={{backgroundColor: colors.bgColor, flex: 1}}>
      <Portal>
        <Modalize ref={errorRef} snapPoint={300} modalHeight={300}>
            <View style={{ display:"flex",flexDirection:"column",gap:5,alignItems:"center" }}>

            </View>
        </Modalize>
      </Portal>
      <SafeAreaView style={sizes.containerStyle}>
        <Header leftSide={true}  title={`Dijiyon Aidat Ödeme`} />
        <View
          style={{
            padding: 10,
            backgroundColor: colors.primary,
            marginTop: 10,
            borderRadius: 10,
          }}>
          <TextComponent color="white" size={15} medium>
            Telefon numarası, tc kimlik veya müşteri numarası ile aidat ödeme
            işlemlerinizi gerçekleştirebilirsiniz.
          </TextComponent>
        </View>
        <TextInput
          value={subscriber}
          returnKeyLabel="Bitti"
          keyboardType="number-pad"
          returnKeyType="done"
          autoFocus
          placeholderTextColor="#8391A1"
          placeholder="Abone Numarası"
          style={{
            ...styles.input,
            borderColor: titleError ? 'red' : '#E8ECF4',
          }}
          onChange={e => setSubscriber(e.nativeEvent.text)}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
      </SafeAreaView>
    </View>
  );
};
//make this component available to the app
export default DijiyonPayment;
