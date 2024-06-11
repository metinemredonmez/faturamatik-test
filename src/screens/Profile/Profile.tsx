//import liraries
import {Text} from '@/components';
import Header from '@/components/Header/Header';
import {colors} from '@/config';
import {useAuth} from '@/contexts/auth/Context';
import {useNavigation} from '@react-navigation/native';
import { Button } from '@rneui/base';
import {Icon} from '@rneui/themed';
import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Card} from 'react-native-ui-lib';
import WebView from 'react-native-webview';

// create a component
const ProfilePage = () => {
  const auth = useAuth();
  const navigation = useNavigation();
  const [url, setUrl] = useState<string>('');

  const [menu, setMenu] = useState([
    {
      id: 1,
      title: 'Bilgilerimi Düzenle',
      page: 'AccountSettings',
      isDivider: false,
    },

    {
      id: 3,
      title: 'Bildirim Ayarları',
      page: 'NotificationSettings',
      isDivider: false,
    },
    {id: 5, title: 'Bilgi', page: 'Diğer', isDivider: true},
    {
      id: 6,
      title: 'Hakkımızda',
      page: 'About',
      isDivider: false,
      isLink: false,
      url: 'https://www.faturamatik.com.tr/tr/hakkimizda/hakkimizda',
    },
    {
      id: 7,
      title: 'Gizlilik Politikası',
      isLink: false,
      page: 'PrivacyPolicy',
      url: 'https://www.faturamatik.com.tr/tr/yasal-bilgilendirme/uyelik-cerceve-sozlesmesi',
      isDivider: false,
    },
  ]);

  const modalizeRef = React.useRef<any>(null);

  return (
    <View style={styles.container}>
      <Portal>
        <Modalize
          ref={modalizeRef}
          snapPoint={Dimensions.get('window').height - getStatusBarHeight()}>
          <WebView
            renderLoading={() => <Text>Yükleniyor</Text>}
            source={{uri: "'https://www.faturamatik.com.tr/tr/yasal-bilgilendirme/uyelik-cerceve-sozlesmesi'"}}
          />
        </Modalize>
      </Portal>
      <SafeAreaView style={{flex: 1, margin: 10, backgroundColor: colors.bgColor}}>
        <Header title="Ayarlar" leftSide={false} />
        <Card enableShadow style={styles.card}>
          <View
            style={{borderBottomWidth: 0.5, borderColor: colors.borderColor}}>
            <View style={{padding: 10}}>
              <Text size={15} medium>
                {auth?.user?.name} {auth?.user?.surname}
              </Text>
            </View>
          </View>
          <View style={{padding: 10}}>
            <Text size={12} light>
              Hesap Ayarları
            </Text>
          </View>
          <FlatList
            data={menu}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  if (item.isLink) {
                    Linking.openURL(item.url);
                    setUrl(item.url);
                    
                  } else {
                    navigation.navigate(item.page);
                  }
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTopWidth: item.isDivider ? 0.5 : 0,
                  borderColor: colors.borderColor,
                  paddingVertical: 5,
                }}>
                <View style={{padding: 10}}>
                  <Text
                    size={13}
                    light={item.isDivider}
                    medium={!item.isDivider}>
                    {item.title}
                  </Text>
                </View>
                {!item.isDivider && (
                  <Icon
                    name="chevron-right"
                    type="evilicon"
                    size={30}
                    color="#484848"
                  />
                )}
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </Card>
        <Button
          onPress={() => {
            auth?.logout();
          }}
          title={'Çıkış Yap'}
          radius={5}
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
            backgroundColor: colors.primary,
            borderRadius: 5,
          }}/>
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
  card: {},
});

//make this component available to the app
export default ProfilePage;
