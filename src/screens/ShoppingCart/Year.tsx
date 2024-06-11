//import liraries
import {Text} from '@/components';
import { colors } from '@/config';
import React, {Component} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {WheelPicker, SectionsWheelPicker} from 'react-native-ui-lib';

// create a component

export interface YearComponentProps {
  onChange: (value: any) => void;
  value: any;
}

const YearComponent = (props: YearComponentProps) => {
  const months = [
    {id: 1, name: '2021'},
    {id: 2, name: '2022'},
    {id: 3, name: '2023'},
    {id: 4, name: '2024'},
    {id: 5, name: '2025'},
    {id: 6, name: '2026'},
    {id: 7, name: '2027'},
    {id: 8, name: '2028'},
    {id: 9, name: '2029'},
    {id: 10, name: '2030'},
    {id: 11, name: '2031'},
    {id: 12, name: '2032'},
    
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
export default YearComponent;
