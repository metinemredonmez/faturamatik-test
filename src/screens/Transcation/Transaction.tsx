//import liraries
import {transactionList} from '@/api/payment';
import Header from '@/components/Header/Header';
import {useAuth} from '@/contexts/auth/Context';
import useFetch from '@/hooks/useFetch';
import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Pressable,
  Platform,
  RefreshControl,
} from 'react-native';
import TransactionItem from './Item';
import Empty from '@/components/Empty/Empty';
import { TouchableOpacity } from 'react-native-ui-lib';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '@/config';

// create a component
const TransactionPage = ({navigation}:NativeStackScreenProps<any>) => {
  const auth = useAuth();

  const [selectedFilter, setSelectedFilter] = React.useState('all');

  const [
    transcationsMutation,
    {
      data: transcationsMutationData,
      error: transcationsMutationError,
      loading: transcationsMutationLoading,
    },
  ] = useFetch<any>();

  console.log(auth?.token);

  useEffect(() => {
    transcationsMutation(transactionList, {
      token: auth?.token,
    });
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1, margin: 10, backgroundColor: colors.bgColor}}>
        <Header title="Hareketler" leftSide={false} />
        {transcationsMutationLoading && (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
        {transcationsMutationData && (
          <FlatList
            data={transcationsMutationData}
            renderItem={({item}) => (
              <TouchableOpacity 
                onPress={() => {
                    navigation.navigate('TransactionDetail', {
                        item: item
                    })
                }}
              useNative={Platform.OS === "ios"}>
                <TransactionItem item={item} />
              </TouchableOpacity>
            )}
            refreshControl={
              <RefreshControl
                refreshing={transcationsMutationLoading}
                onRefresh={() => {
                  transcationsMutation(transactionList, {
                    token: auth?.token,
                  });
                }}
              />
            }
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Empty title="Hareket bulunamadı" />}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
});

//make this component available to the app
export default TransactionPage;
