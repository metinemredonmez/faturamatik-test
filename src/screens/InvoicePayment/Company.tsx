//import liraries
import {Text} from '@/components';
import {Icon} from '@rneui/themed';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {GridListItem, ListItem} from 'react-native-ui-lib';

// create a component
const Company = ({item}: any) => {
  return (
    <View style={styles.container}>
      <Text medium size={15} color="#484848">
        {item.KurumAdi}
      </Text>
      <Icon size={24} name="chevron-right" color="grey" />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 60,
    borderBottomWidth: 0.5,
    borderColor: '#E5E5E5',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

//make this component available to the app
export default Company;
