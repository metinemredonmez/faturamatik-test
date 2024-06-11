//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import MenuItem from './MenuItem';
import {Icon} from '@rneui/themed';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-ui-lib';

// create a component

export interface MenuComponentProps {
  hasBg?: boolean;
}

const MenuComponent = () => {
  const navigation = useNavigation();
  const menuItems = [
    {
      title: 'En Yakın Faturamatik',
      params:{},
      icon: <Icon name="map-pin" type="feather" size={12} color="white" />,
      link: 'Dealers',
    },
    {
      title: 'Fatura Öde',
      params:{},
      icon: (
        <Icon
          name="file-invoice"
          type="font-awesome-5"
          size={12}
          color="white"
        />
      ),
      link: 'InvoicePaymentNavigation',
    },
    {
      title: 'İnternet Başvuruları',
      params:{
        category: 'İnternet',
      },
      icon: <Icon name="appstore-o" type="antdesign" size={12} color="white" />,
      link: 'Application',
    },
    {
      title: 'Kira Öde',
      params:{},
      icon: <Icon name="home" type="feather" size={12} color="white" />,
      link: '',
      isSoon: true,
      description: 'Kira Ödemeleri çok yakında burada!',
    },
    {
      title: 'Digiturk Başvuruları',
      params:{
        category: 'Dijital TV',
      },
      icon: <Icon name="appstore-o" type="antdesign" size={12} color="white" />,
      link: 'Application',
      isSoon: false,
      description: 'Digiturk Başvuruları çok yakında burada!',
    },
    {
      title: 'Aidat Ödeme',
      params:{},
      icon: (
        <Icon name="calendar" type="simple-line-icon" size={12} color="white" />
      ),
      // link: 'DijiyonPayment',
      isSoon: true,
      description: 'Dijiyon Aidat Ödeme çok yakında burada!',
    },
    {
      title: 'Pronet Başvurusu',
      params:{
        category: 'Güvenlik',
      },
      icon: <Icon name="appstore-o" type="antdesign" size={12} color="white" />,
      link: 'Application',
      isSoon: false,
      description: 'Pronet Başvurusu çok yakında burada!',
      
    },
    {
      title: 'Kayıtlı işlemlerim',
      params:{},
      icon: <Icon name="edit" type="feather" size={12} color="white" />,
      link: 'SavedTransaction',
    },
  ];
  return (
    <View style={styles.container}>
      {
        menuItems.map((item, index) => {
          return (
            <MenuItem
              key={index}
              title={item.title}
              icon={item.icon}
              link={item.link}
              onPress={() => {
                if(item.isSoon) {
                  Alert.alert(item.description);
                }
                else {
                  item.link.length > 0 && navigation.navigate(item.link, {
                    ...item.params,
                    title: item.title,
                  });
                }
              }}
            />
          );
        })
      }
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

//make this component available to the app
export default MenuComponent;
