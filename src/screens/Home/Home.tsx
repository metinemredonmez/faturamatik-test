//import liraries
import React, {useEffect} from 'react';
import {
  ScrollView,
  FlatList,
  Pressable,
  Alert,
  Dimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';
import styles from './Style';
import {Text, Text as TextComponent} from '@/components';
import {colors, sizes} from '@/config';
import Header from '@/components/Header/Header';
import Slider from './Slider';
import MenuComponent from './Menu';
//@ts-ignore
import messaging from '@react-native-firebase/messaging';

import {useAuth} from '@/contexts/auth/Context';
import BlogItem from './BlogItem';
import useFetch from '@/hooks/useFetch';
import {posts, slider} from '@/api/blog';
import {requestTrackingPermission} from 'react-native-tracking-transparency';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {Icon} from '@rneui/themed';
import {updateFcmToken} from '@/api/user';

// create a component
const HomePage = ({navigation}: any) => {
  const auth = useAuth();
  const [
    updatFcmTokenMutation,
    {
      data: updatFcmTokenMutationData,
      loading: updatFcmTokenMutationLoading,
      error: updatFcmTokenMutationError,
    },
  ] = useFetch<any>();
  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();

    const trackingStatus = await requestTrackingPermission();
    if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
      // enable tracking features
    }

    if (authorizationStatus) {
    }
  }

  const checkFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      updatFcmTokenMutation(updateFcmToken, {
        fcmToken,
        token:auth?.token
      });
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  useEffect(() => {
    checkFcmToken();
  }, []);

  useEffect(() => {
    if (updatFcmTokenMutationData) {
      console.log('updatFcmTokenMutationData', updatFcmTokenMutationData);
    }
  }, [updatFcmTokenMutationData]);

  useEffect(() => {
    if (updatFcmTokenMutationError) {
      console.log('updatFcmTokenMutationError', updatFcmTokenMutationError);
    }
  }, [updatFcmTokenMutationError]);

  useEffect(() => {
    if (updatFcmTokenMutationLoading) {
      console.log('updatFcmTokenMutationLoading', updatFcmTokenMutationLoading);
    }
  }, [updatFcmTokenMutationLoading]);

  useEffect(() => {
    requestUserPermission().then(r => {});
  }, []);

  const [blogQuery, {data: blogData}] = useFetch<any>();

  const [sliderQuery, {data: sliderData}] = useFetch<any>();

  useEffect(() => {
    // @ts-ignore
    blogQuery(posts, {});
    // @ts-ignore
    sliderQuery(slider, {});
  }, []);

  useEffect(() => {
    if (sliderData) {
    }
  }, [sliderData]);

  const onLogout = () => {
    Alert.alert('Çıkış Yap', 'Çıkış yapmak istediğinize emin misiniz?', [
      {
        text: 'Evet',
        onPress: () => {
          auth.logout();
          navigation.navigate('Login', {
            initialScreen: 'Login',
          });
        },
      },
      {text: 'Hayır', style: 'cancel'},
    ]);
  };

  return (
    <View backgroundColor={colors.bgColor}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      {/* <Header
        leftSide={false}
        hasLogout
        logout={onLogout}
        subtitle={''}
        title={`Hoşgeldin ${auth.user?.name}`}
      /> */}
      <View
        backgroundColor={colors.primary}
        width={Dimensions.get('window').width}
        height={150}>
        <ImageBackground
          source={require('@/assets/images/home-bg.png')}
          style={styles.homeBg}>
          <View
            flex
            row
            style={{justifyContent: 'space-between', height: 50}}
            centerV>
            <View flex style={{flexDirection: 'column'}} centerV height={50}>
              <Text color="white" size={20} bold>
                Selam, {auth.user?.name}
              </Text>
              <Text color="white" medium size={14}>
                Hoşgeldin
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProfileNavigation');
              }}
              useNative
              backgroundColor="rgba(255,255,255,0.2)"
              style={styles.inputContainer}>
              <Icon name="settings" type="feather" color="white" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 30,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          backgroundColor: colors.bgColor,
          paddingBottom: 200,
        }}>
        <View paddingH-10>
          {sliderData && sliderData.length > 0 && <Slider items={sliderData} />}
        </View>
        <View paddingH-10>
          <MenuComponent />
        </View>
        <View style={sizes.containerStyle}>
          <View style={styles.blogContainer}>
            {blogData &&
              blogData.length > 0 &&
              blogData.map((item: any, index: number) => (
                <View key={index} style={{marginVertical: 5}}>
                  <TextComponent bold>{item.t_kategori}</TextComponent>

                  <FlatList
                    data={item.blog_yazilari}
                    renderItem={({item, index}) => (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('BlogDetail', {
                            initialScroll: index,
                            ...item,
                          })
                        }>
                        <BlogItem index={index} {...item} />
                      </Pressable>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
//make this component available to the app
export default HomePage;
