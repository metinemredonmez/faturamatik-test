//import liraries
import {Text} from '@/components';
import { colors } from '@/config';
import React, {Component} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {WheelPicker, SectionsWheelPicker} from 'react-native-ui-lib';

// create a component

export interface MonthComponentProps {
  onChange: (value: any) => void;
  value: any;
}

const MonthComponent = (props: MonthComponentProps) => {
  const months = [
    {id: 1, name: '01'},
    {id: 2, name: '02'},
    {id: 3, name: '03'},
    {id: 4, name: '04'},
    {id: 5, name: '05'},
    {id: 6, name: '06'},
    {id: 7, name: '07'},
    {id: 8, name: '08'},
    {id: 9, name: '09'},
    {id: 10, name: '10'},
    {id: 11, name: '11'},
    {id: 12, name: '12'},
  ];

  const [selectedMonth, setSelectedMonth] = React.useState<any>(props.value);

  return (
    <View style={styles.container}>
      <FlatList
        data={months}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
                setSelectedMonth(item.name);
                props.onChange(item.name);
            }}
            style={{
              backgroundColor: selectedMonth == item.name ? colors.primary : 'white',
              width: '100%',
              alignItems: 'center',
              height: 50,
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Text size={12} medium color={selectedMonth == item.name ? 'white' : '#484848'}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{width: '100%', height: 1, backgroundColor: '#dedede'}}
          />
        )}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

//make this component available to the app
export default MonthComponent;
