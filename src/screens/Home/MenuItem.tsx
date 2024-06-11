//import liraries
import {Text} from '@/components';
import {Icon} from '@rneui/themed';
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Card} from 'react-native-ui-lib';

// create a component

export interface MenuItemProps {
  title: string;
  icon: any;
  link?: any | string | null;
  onPress?: () => void;
}

const MenuItem = (props: MenuItemProps) => {
  return (
    <Card enableShadow color="white" style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={props.onPress}>
        <LinearGradient
          colors={['#0033A1', '#011F61']}
          style={styles.iconContainer}>
          {props.icon}
        </LinearGradient>
        <View
          style={{
            width: '70%',
            overflow: 'hidden',
          }}>
          <Text style={{ flexWrap:"wrap" }} medium color="#484848" size={11}>
            {props.title}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: "47%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginVertical: 5,
    height: 50,
    marginHorizontal: 4,
    shadowColor: '#0A8BD1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 0.5,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    
  },
  iconContainer: {
    padding: 5,
    borderRadius: 5,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: "30%",
    maxWidth: 30,
    height: 30,
  },
});

//make this component available to the app
export default MenuItem;
