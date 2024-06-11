//import liraries
import {Text} from '@/components';
import {colors} from '@/config';
import { Icon } from '@rneui/themed';
import moment from 'moment';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

// create a component
const TransactionItem = ({item}: any) => {
  return (
    <View style={styles.container}>
      <View>
        <Text size={12} medium>
          {item.t_odeme_id}
        </Text>
        <Text size={12} medium>
          {moment(item.t_tarih).format('DD.MM.YYYY HH:mm')}
        </Text>
      </View>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <View
            style={{
              ...styles.status,
              backgroundColor:
                item.t_durum == 'Başarısız' ? colors.red : colors.success,
            }}>
            <Text color="white" size={12} medium>
              {item.t_durum}
            </Text>
          </View>
          <Text color="#484848" size={12} bold>
            {item.t_odeme_tutari} TL
          </Text>
        </View>
        <View>
            <Icon name="chevron-right" type="evilicon" size={30} color="#484848" />
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  status: {
    padding: 5,
    borderRadius: 5,
    width: 120,
    maxWidth: 120,
    alignItems: 'center',
  },
});

//make this component available to the app
export default TransactionItem;
