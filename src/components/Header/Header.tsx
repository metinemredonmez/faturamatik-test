//import liraries
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Text} from '..';
import {colors} from '@/config';
import {Icon} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';

import {Button} from 'react-native-ui-lib';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  hasLogout?: boolean;
  leftSide: boolean | null;
  rightSide?: any | null;
  logout?: any;
}

// create a component
const Header = (props: HeaderProps) => {
  const navigate = useNavigation();

  const onLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinize emin misiniz?',
      [
        {
          text: 'Hayır',
        },
        {
          text: 'Evet',
          onPress: () => console.log('tıkla'),
        },
      ],
      {cancelable: false},
    );
  };
  const LogoutComponent = () => {
    return (
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
        onPress={props.logout}>
        <Icon
          type="feather"
          name="power"
          size={25}
          color={colors.userHeaderColor}
        />
      </TouchableOpacity>
    );
  };

  if (props.leftSide) {
    return (
      <View style={styles.container}>
        <View style={{position:"absolute",zIndex:10000,top:5,display:"flex",alignItems:"flex-start", justifyContent:"center" }}>
          <TouchableOpacity
            onPress={() => navigate.goBack()}
            style={{
             padding:5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#E8ECF4',
              borderRadius: 10,
              
            }}>
            <Icon
              type="feather"
              name="chevron-left"
              size={20}
              color={colors.userHeaderColor}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            flex: 1,
            display:"flex",
            width:"100%"
          }}>
          <Text
            size={18}
            color={colors.userHeaderColor}
            semibold
            style={{textAlign: 'center'}}>
            {props.title}
          </Text>
        </View>
        
        {props.hasLogout && <LogoutComponent />}
        {props.rightSide && props.rightSide}
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.container,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
      }}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 40,
          justifyContent: 'center',
        }}>
        <Text size={18} color={colors.userHeaderColor} semibold>
          {props.title}
        </Text>
      </View>
      {props.hasLogout && <LogoutComponent />}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  back: {
    padding: 5,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: 10,
  },
});

//make this component available to the app
export default Header;
