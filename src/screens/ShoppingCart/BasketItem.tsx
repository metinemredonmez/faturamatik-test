//import liraries
import {Text} from '@/components';
import {colors} from '@/config';
import moment from 'moment';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Checkbox} from 'react-native-ui-lib';

// create a component
const BasketItem = ({item}: any) => {
  

  return (
    <View style={styles.container}>
      {/* <View style={styles.checkbox}>
        <Checkbox
          color={colors.primary}
          value={item.checked}
          
        />
      </View> */}
      <View style={styles.info}>
        <View style={styles.side}>
          <Text color="#484848" bold>Fatura No</Text>
          <Text color="#484848" medium>Son Ödeme Tarihi</Text>
          <Text color="#484848" medium>Tutar</Text>
        </View>
        <View style={styles.side}>
          <Text color="#484848" medium>
            {item.t_fatura_no}
          </Text>
          <Text color="#484848" bold>{moment(item.t_son_odeme).format('DD.MM.YYYY')}</Text>

          <Text color="#484848" medium>{item.t_fatura_tutari} ₺</Text>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 100,
    borderBottomWidth: 0.5,
    borderColor: colors.borderColor,
    paddingVertical: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  side: {
    display: 'flex',
    flexDirection: 'column',
  },
});

//make this component available to the app
export default BasketItem;
