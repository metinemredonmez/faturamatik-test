//import liraries
import {deleteBasket, listBaskets} from '@/api/basket';
import Header from '@/components/Header/Header';
import Loading from '@/components/Loading/Loading';
import {useAuth} from '@/contexts/auth/Context';
import {useLoading} from '@/contexts/loading/Context';
import useFetch from '@/hooks/useFetch';
import React, {Component, useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Button, TouchableOpacity} from 'react-native-ui-lib';
import BasketItem from './BasketItem';
import Empty from '@/components/Empty/Empty';
import {colors} from '@/config';
import {Text} from '@/components';
import {useNotification} from '@/contexts/notification/Context';
import {useFocusEffect} from '@react-navigation/native';
import {useBasket} from '@/contexts/basket/Context';
import { NotifierRoot } from 'react-native-notifier';

// create a component
const ShoppingCartPage = ({navigation}: any) => {
  const auth = useAuth();
  const loader = useLoading();
  const notif = useNotification();
  const basket = useBasket();
  const [carts, setCarts] = useState<any[]>([]);
  const [saveTransactionModal, setSaveTransactionModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      listBasketQuery(listBaskets, {
        token: auth?.token,
      });
    }, [navigation]),
  );

  const [
    listBasketQuery,
    {
      data: listBasketQueryData,
      error: listBasketQueryError,
      loading: listBasketQueryLoading,
    },
  ] = useFetch<any>();

  const [
    deleteBasketMutation,
    {
      data: deleteBasketMutationData,
      error: deleteBasketMutationError,
      loading: deleteBasketMutationLoading,
    },
  ] = useFetch<any>();

  useEffect(() => {
    listBasketQuery(listBaskets, {
      token: auth?.token,
    });
  }, []);

  useEffect(() => {
    if (listBasketQueryLoading) {
      loader.setLoading(true);
    } else {
      loader.setLoading(false);
    }
  }, [listBasketQueryLoading]);

  useEffect(() => {
    if (listBasketQueryData) {
      console.log(listBasketQueryData[0].fatura_bilgileri);
      setCarts(
        listBasketQueryData[0].fatura_bilgileri?.map(item => {
          return {
            ...item,
            checked: false,
          };
        }),
        
      );
      if(listBasketQueryData[0].fatura_bilgileri?.length > 0) basket.setBasket(listBasketQueryData[0].fatura_bilgileri?.length)
      
    }
  }, [listBasketQueryData]);

  const handleDelete = () => {
    
    deleteBasketMutation(deleteBasket, {
      token: auth?.token,
    });
  };

  const deleteItems = () => {
    carts.filter(item => item.checked).map(item => {});
  };

  useEffect(() => {
    if (deleteBasketMutationData) {
      console.log("data",deleteBasketMutationData);
      notif.handleNotification({
        title: 'Başarılı',
        message: deleteBasketMutationData[0].mesaj,
        type: 'success',
      });
      listBasketQuery(listBaskets, {
        token: auth?.token,
      });
      basket.setBasket(0);
      setCarts([]);
    }
    else {
      console.log("data",deleteBasketMutationData);
    }
  }, [deleteBasketMutationData]);

  useEffect(() => {
    if (deleteBasketMutationError) {
      console.log(deleteBasketMutationError);
    }
  }, [deleteBasketMutationError]);

  useEffect(() => {
    if (deleteBasketMutationLoading) {
      console.log(deleteBasketMutationLoading);
    }
  }, [deleteBasketMutationLoading]);

  const notifRef = useRef<any>(null);

  return (
    <View style={styles.container}>
      <NotifierRoot ref={notifRef}/>
      <SafeAreaView style={{flex: 1, margin: 10}}>
        <Header title="Sepetim" leftSide={false} />
        <FlatList
          data={carts}
          renderItem={({item, index}) => (
            <TouchableOpacity
              useNative
              onPress={() => {
                const newCarts = carts;
                newCarts[index].checked = !newCarts[index].checked;
                setCarts([...newCarts]);
              }}>
              <BasketItem item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Empty title="Kayıt Bulunamadı" />}
        />

        <TouchableOpacity
          style={{
            ...styles.payButton,
            display: carts?.length > 0 ? 'flex' : 'none',
          }}
          onPress={() => {
            carts?.length > 0 ? navigation.navigate('CardForm') : null;
          }}>
          <Text size={15} color="white" medium>
            Ödeme İşlemine Geç
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete()}
          style={{
            ...styles.dangerButton,
            display: carts?.length > 0 ? 'flex' : 'none',
          }}>
          <Text size={15} color="white" medium>
            Sepeti Temizle
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  dangerButton: {
    width: '100%',
    height: 56,
    backgroundColor: colors.red,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButton: {
    width: '100%',
    height: 56,
    backgroundColor: colors.success,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

//make this component available to the app
export default ShoppingCartPage;
