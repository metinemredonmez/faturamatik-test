//import liraries
import {listBaskets} from '@/api/basket';
import {Text} from '@/components';
import {useAuth} from '@/contexts/auth/Context';
import useFetch from '@/hooks/useFetch';
import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Button, TouchableOpacity} from 'react-native-ui-lib';

// create a component

export interface SummaryProps {
  invocies: any[];
  selectedInstallment?: any;
  setInstallmentModal: any;
  serviceFee?: any;

}

const Summary = (props: SummaryProps) => {
  const {invocies} = props;

  

  return (
    <View>
      <View style={{marginTop: 20}}>
        <View style={styles.item}>
          <Text size={15} regular>
            Toplam Fatura Adedi
          </Text>
          <Text size={15} semibold>
            {invocies.length}
          </Text>
        </View>
        {props.selectedInstallment && (
          <View style={styles.item}>
            <Text size={15} regular>
              Taksit Sayısı{' '}
              <TouchableOpacity onPress={() => props.setInstallmentModal(true)}>
                <Text size={15} color="#484848" semibold>
                  (Değiştir)
                </Text>
              </TouchableOpacity>
            </Text>
            <Text size={15} semibold>
              {props.selectedInstallment?.t_taksit_sayisi}
            </Text>
          </View>
        )}
        <View style={styles.item}>
          <Text size={15} regular>
            Toplam Fatura Tutarı
          </Text>
          <Text size={15} semibold>
            {invocies.reduce((a, b) => a + b.t_fatura_tutari, 0).toFixed(2)} TL
          </Text>
        </View>
        {props.selectedInstallment && (
          <View style={styles.item}>
            <Text size={15} regular>
              Komisyon
            </Text>
            <Text size={15} semibold>
              {props.selectedInstallment?.komisyon} TL
            </Text>
          </View>
        )}
        {props.serviceFee && (
          <View style={styles.item}>
            <Text size={15} regular>
              Hizmet Bedeli
            </Text>
            <Text size={15} semibold>
              {props.serviceFee} TL
            </Text>
          </View>
        )}
        {props.selectedInstallment && (
          <View style={styles.item}>
            <Text size={15} regular>
              Ödeme Tutarı
            </Text>
            <Text size={15} semibold>
              {props.selectedInstallment.tutar.toFixed(2)} TL
            </Text>
          </View>
        )}
        
        {/* <View style={{ width:"100%" }}>
            <Button label="Faturaları Gör" backgroundColor="#414141" labelStyle={{ 
                color: "white",
                fontSize: 15,
                fontWeight: "bold"
             }} color="white" borderRadius={5} />
        </View> */}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    borderColor: '#dedede',
  },
});

//make this component available to the app
export default Summary;
