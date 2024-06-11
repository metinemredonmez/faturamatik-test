//import liraries
import {Text} from '@/components';
import {colors} from '@/config';
import React, {Component, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {RadioButton, TouchableOpacity} from 'react-native-ui-lib';

// create a component
export interface InstallmentProps {
  item: any;
  selected: any;
}
const Installment = (props: InstallmentProps) => {
  const {item, selected} = props;

  const title = item.t_taksit_sayisi == 1 ? 'Tek Çekim' : item.t_taksit_sayisi;

  return (
    <View style={styles.installmentContainer}>
      
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginVertical: 10,
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          paddingBottom: 10,
          borderColor: colors.borderColor,
        }}>
        <View
          style={{
            display: 'flex',
            gap: 2,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{marginRight: 10}}>
            <RadioButton
              size={20}
              color={colors.primary}
              selected={props.selected === item.t_taksit_sayisi}
              
              
            />
          </View>
          <Text size={15} medium color="#484848">
            {title}
          </Text>
        </View>
        <View style={{ flex:1,alignItems:"flex-end" }}>
          <Text size={15} medium color="#484848">
            {item.tutar.toFixed(2)} TL
          </Text>
        </View>
      </View>
    </View>
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
});

//make this component available to the app
export default Installment;
