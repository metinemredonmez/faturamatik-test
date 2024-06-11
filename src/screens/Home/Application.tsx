//import liraries
import {applicationProcess} from '@/api/blog';
import {Text} from '@/components';
import Header from '@/components/Header/Header';
import {colors} from '@/config';
import useFetch from '@/hooks/useFetch';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Skeleton} from '@rneui/base';
import {Icon} from '@rneui/themed';
import React, {Component, useEffect} from 'react';
import {Image} from 'react-native';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Pressable,
  Platform
} from 'react-native';
import {Card} from 'react-native-ui-lib';

// create a component
const Application = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const skeletonArray = new Array(5).fill(0);

  const [
    applicationQuery,
    {
      loading: applicationLoading,
      error: applicationError,
      data: applicationData,
    },
  ] = useFetch<any>();

  useEffect(() => {
    applicationQuery(applicationProcess, {});
  }, []);

  useEffect(() => {
    if (applicationData) {
      console.log(applicationData);
    }
  }, [applicationData]);

  const RenderSkeleton = () => {
    return (
      <View style={{marginVertical: 10}}>
        {skeletonArray.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                marginVertical: 10,
                borderBottomWidth: 0.5,
                borderColor: colors.borderColor,
                paddingVertical: 10,
              }}>
              <Skeleton height={150} />
              <Skeleton height={10} style={{marginTop: 5}} />
              <Skeleton height={10} style={{marginTop: 10}} />
            </View>
          );
        })}
      </View>
    );
  };

  const category = route?.params?.category;

  return (
    <View style={styles.container}>
      <SafeAreaView style={{margin: 15}}>
        {/* <Header title="Başvurular" leftSide /> */}
        {applicationLoading && <RenderSkeleton />}
        {applicationData && <Header title={route?.params?.title} leftSide />}
        {applicationData && (
          <FlatList
            showsVerticalScrollIndicator={false}
            
            data={applicationData.filter(
                (item: any) => item.t_kategori === category,
            )}
            contentContainerStyle={{paddingBottom: 100}}
            renderItem={({item, index}) => (
              <Pressable key={index}
                onPress={() =>
                    navigation.navigate('ApplicationDetail', {
                        initialScroll: index,
                        ...item,
                    })
                }
              >
                <Card enableShadow={false} style={{ 
                    
                    paddingBottom:10,
                    marginVertical:5,
                 }}>
                  <View style={styles.blogImageContainer}>
                    <Image
                      style={styles.blogImage}
                      source={{uri: `https://${item.p_dosya_url}`}}
                    />
                  </View>
                  <View style={styles.descriptionContainer}>
                    <View style={{flexDirection: 'column'}}>
                      <Text bold style={styles.blogTitle}>
                        {item.t_baslik.replace(/&quot;/g, '"')}
                      </Text>
                      <Text medium style={styles.blogDescription}>
                        {item.t_ozet.replace(/&quot;/g, '"')}
                      </Text>
                    </View>
                    
                    <View style={styles.blogDetailButton}>
                      <Text
                        style={{
                          color: colors.primary,
                          fontFamily: 'Ubuntu-Medium',
                          fontSize: 12,
                        }}>
                        Detaylar
                      </Text>
                      <Icon
                        type="feather"
                        name="arrow-right"
                        size={15}
                        color={colors.primary}
                      />
                    </View>
                  </View>
                </Card>
              </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
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
  blogItem: {
    width: '100%',
    backgroundColor: 'white',
    marginVertical:5,
    paddingBottom: 10,
  },
  blogDetailButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  blogImageContainer: {
    width: '100%',
  },
  blogImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  blogDesriptionContainer: {
    marginBottom: 15,
    width: '100%',

    marginTop: 10,
    paddingHorizontal: 10,
  },
  itemTitle: {
    fontFamily: 'Ubuntu-Bold',
    marginLeft: 10,
  },
  blogImageItem: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  descriptionContainer: {
    padding: 10,
  },
  blogTitle: {
    fontSize: 12,
    fontFamily: 'Ubuntu-Medium',
    paddingBottom: 5,
    height: 40,
    flexWrap: 'wrap',
    flex: 1,
  },
  blogDescription: {
    fontSize: 9,
    fontFamily: 'Ubuntu-Regular',
    color: '#7E7E7E',
    height: 20,
  },
  blogButton: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 40,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    zIndex: 10,
    elevation: 10,
    ...Platform.select({
      ios: {
        marginTop: -20,
      },
      android: {
        marginTop: -20,
      },
    }),
  },
});

//make this component available to the app
export default Application;
