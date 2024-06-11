//import liraries
import Header from '@/components/Header/Header';
import {colors} from '@/config';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Touchable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import SearchBar from './SearchBar';
import useFetch from '@/hooks/useFetch';
import {useLoading} from '@/contexts/loading/Context';
import {companyList} from '@/api/payment';
import {useAuth} from '@/contexts/auth/Context';
import CategoryItem from './CategoryItem';
import {Button, TouchableOpacity} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';

// create a component
const InvoicePaymentScreen = () => {
  const navigation = useNavigation();
  const loading = useLoading();
  const auth = useAuth();

  const [companyListData, setCompanyListData] = useState<any>([]);

  const [search, setSearch] = useState('');

  const [
    companyListMutation,
    {
      data: companyListMutationData,
      error: companyListMutationError,
      loading: companyListMutationLoading,
    },
  ] = useFetch<any>();

  useEffect(() => {
    getCompanies();
  }, []);

  useEffect(() => {
    if (companyListMutationLoading) {
      loading.setLoading(true);
    } else {
      loading.setLoading(false);
    }
  }, [companyListMutationLoading]);

  const unique = (arr: any) => {
    const categories = new Set();
    arr.forEach((item: any) => {
      categories.add(item.KurumTuru);
    });
    return Array.from(categories);
  };

  useEffect(() => {
    if (companyListMutationData) {
      if (companyListMutationData[0].sonuc == 200) {
        //group by KurumTuru
        const grouped = unique(companyListMutationData[0].Content);

        setCompanyListData(grouped);
      } else {
      }
      console.log(companyListMutationData);
    }
  }, [companyListMutationData]);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = () => {
    companyListMutation(companyList, {
      token: auth?.token,
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{margin: 15}}>
        <Header title="Fatura Ödeme" leftSide />
        <View style={{ marginTop:10 }}>
          <SearchBar search={search} setSearch={setSearch} />
        </View>
        {/* <Text>{JSON.stringify(companyListData)}</Text> */}
        {companyListMutationLoading && (
          <ActivityIndicator size="large" color={colors.primary} />
        )}
        <FlatList
          data={(companyListData && companyListData) || []}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CompanyListNavigation', {
                  category: item,
                  data: companyListMutationData[0].Content,
                });
                // navigation.navigate('SuccessTransaction')
              }}>
              <CategoryItem category={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
});

//make this component available to the app
export default InvoicePaymentScreen;
