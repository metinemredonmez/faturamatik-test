//import liraries
import {Text} from '@/components';
import Header from '@/components/Header/Header';
import {colors} from '@/config';
import {useAuth} from '@/contexts/auth/Context';
import {useNavigation} from '@react-navigation/native';
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
import RenderHTML from 'react-native-render-html';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Card} from 'react-native-ui-lib';
import WebView from 'react-native-webview';

// create a component
const AboutPage = () => {
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
    {id: 5, title: 'Diğer', page: 'Diğer', isDivider: true},
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
      <SafeAreaView style={{flex: 1, margin: 10, backgroundColor: 'white'}}>
        <Header title="Hakkımızda" leftSide={true} />
        <Card enableShadow style={styles.card}>
          <Text size={15} bold>
            İşletmeler, aboneler ve fatura üreten kurumlar için hizmet
            veriyoruz.
          </Text>
          <View style={{marginVertical: 10}}>
            <Text size={13} medium>
              Sektörünün öncüsü olarak faaliyetlerine devam eden Faturamatik,
              ödeme noktaları ve dijital kanallarından müşterilerine para
              transferi, sanal pos ve fatura ödeme hizmetlerini hızlı, kolay ve
              güvenilir biçimde sunar. Bunu yaygın temsilcilik (bayilik) ağı ve
              yaklaşık 200 çalışanıyla müşterilerine güler yüzlü ve kesintisiz
              şekilde yapar. İnovasyon kültürü, dijitalleşme vizyonu, güvenli
              ödeme hizmeti, yaygın bayi ağı ve bayilerine yeni iş olanakları
              yaratma misyonuyla hareket eder; müşterilerine, temsilcilerine, iş
              birliği yaptığı kurumlara ve çalışanlarına her alanda en iyi
              deneyimi sunmak için teknoloji ve süreçlerini sürekli geliştirir.
            </Text>
            <Text style={{marginTop: 10}} size={13} medium>
              İletişim kanallarıyla her zaman ulaşılabilir olan Faturamatik için
              en önemli şey, memnuniyettir
            </Text>
          </View>
        </Card>
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
  card: {
    marginVertical: 10,
    padding:5
  },
});

//make this component available to the app
export default AboutPage;
