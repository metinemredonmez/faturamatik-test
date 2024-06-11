//import liraries
import {transactionList} from '@/api/payment';
import Header from '@/components/Header/Header';
import {useAuth} from '@/contexts/auth/Context';
import useFetch from '@/hooks/useFetch';
import React, {Component, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Pressable,
  Platform,
  ScrollView,
} from 'react-native';

import Empty from '@/components/Empty/Empty';
import {TouchableOpacity} from 'react-native-ui-lib';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {posts} from '@/api/blog';
import {Text} from '@/components';
import BlogItem from './BlogItem';

// create a component
const ExplorePage = ({navigation}: NativeStackScreenProps<any>) => {
  const [blogQuery, {loading: blogLoading, error: blogError, data: blogData}] =
    useFetch<any>();

  useEffect(() => {
    blogQuery(posts, {});
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1, margin: 10, backgroundColor: 'white'}}>
        <Header title="Avantajları Keşfet" leftSide={false} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.blogContainer}>
            {blogData &&
              blogData.length > 0 &&
              blogData.map((item: any, index: number) => (
                <View key={index} style={{marginVertical: 5}}>
                  <FlatList
                    data={item.blog_yazilari}
                    renderItem={({item, index}) => (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('ExploreDetail', {
                            initialScroll: index,
                            ...item,
                          })
                        }>
                        <BlogItem index={index} {...item} />
                      </Pressable>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              ))}
          </View>
        </ScrollView>
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
export default ExplorePage;