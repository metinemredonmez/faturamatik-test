//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '@/components/Header/Header';
import Company from './Company';
import SearchBar from './SearchBar';
// create a component
const CompanyList = ({
  navigation,
  route,
}: NativeStackScreenProps<any | 'CompanyList'>) => {
  const {category, data} = route.params;
  const [search, setSearch] = React.useState('');
  const newData = data.filter((item: any) => item.KurumTuru === category);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1, margin: 10}}>
        <Header title={category} leftSide />
        <View style={{marginTop: 10}}>
          <SearchBar search={search} setSearch={setSearch} />
        </View>
        <FlatList
          contentContainerStyle={{paddingBottom: 20, marginTop: 10}}
          data={
            search.length > 0
              ? newData.filter((item: any) =>
                  item.KurumAdi.toLowerCase().includes(search.toLowerCase()),
                )
              : newData
          }
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SubscriptionInquiry', {
                  company: item,
                })
              }>
              <Company item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
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
export default CompanyList;
