//import liraries
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '@/components';
import moment from 'moment';
import {colors} from '@/config';
import { TouchableOpacity } from 'react-native-ui-lib';
// create a component

export interface InvoiceItemProps {
  item: any;
  onPress: () => void;
  selected: boolean;
}

const InvoiceItem = (props: InvoiceItemProps) => {
  const invoice = props.item;

  const selected = props.selected;

  return (
    <TouchableOpacity useNative onPress={props.onPress}>
      <View
        style={{
          ...styles.invoiceItem,
          backgroundColor: selected ? colors.primary : colors.white,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              color={selected ? colors.white : colors.black}
              regular
              size={12}>
              Fatura No
            </Text>
          </View>
          <View>
            <Text
              color={selected ? colors.white : colors.black}
              semibold
              size={12}>
              {invoice.FaturaNo}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              color={selected ? colors.white : colors.black}
              regular
              size={12}>
              Son Ödeme Tarihi
            </Text>
          </View>
          <View>
            <Text
              color={selected ? colors.white : colors.black}
              semibold
              size={12}>
              {moment(invoice.SonOdeme).format('DD.MM.YYYY')}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              color={selected ? colors.white : colors.black}
              regular
              size={12}>
              Tutar
            </Text>
          </View>
          <View>
            <Text
              color={selected ? colors.white : colors.black}
              semibold
              size={12}>
              {invoice.Tutar}{' '}
              <Text
                color={selected ? colors.white : colors.black}
                size={9}
                medium>
                TL
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  invoiceInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  invoiceItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
  },
  invoiceItem: {
    display: 'flex',
    borderWidth: 0.5,
    borderColor: '#E8ECF4',

    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
});

//make this component available to the app
export default InvoiceItem;
