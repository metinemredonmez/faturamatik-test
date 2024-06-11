//import liraries
import React, {Component, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacityComponent,
  Animated,
} from 'react-native';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
// @ts-ignore
import Entypo from 'react-native-vector-icons/Entypo';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';

import {Text} from '..';
import FaturamatikTabIcon from '../Icon/FaturamatikTab';
import {Icon} from '@rneui/base';
import {colors} from '@/config';
import {useBasket} from '@/contexts/basket/Context';
import {Button} from 'react-native-ui-lib';
// create a component
const TAB_BAR_WIDTH = Dimensions.get('window').width / 5;
  const ANIMATED_PART_HEIGHT = 5;
const BottomBar = (props: any) => {
  
  const {state, descriptors, navigation} = props;

  const animationHorizontalValue = useRef(new Animated.Value(0)).current;

  const animate = (index: any) => {
    Animated.spring(animationHorizontalValue, {
      toValue: index * TAB_BAR_WIDTH,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animate(state.index);
  }, [state.index]);

  const activeTextStyle = {
    color: '#5876B7',
    fontSize: 11,
    opacity: 1,
  };
  const passiveTextStyle = {
    color: '#8F8F8F',
    fontSize: 11,
    opacity: 1,
  };

  const activeTabColor = '#797979';
  const passiveTabColor = '#1D1D1D';
  const tabSize = 18;
  const totalWidth = Dimensions.get('window').width;
  const tabWidth = totalWidth / state.routes.length;

  const basket = useBasket();

  return (
    <View>
      
      <View style={styles.tabContainer}>
        {state.routes.map((route: any, index: any) => {
          const scale = new Animated.Value(1);
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            // Prevent default behavior of jumping to top of page

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
            if (!isFocused && !event.defaultPrevented) {
              Animated.timing(scale, {
                toValue: 1.2,
                duration: 500,
                useNativeDriver: true,
              }).start();
            } else {
              Animated.timing(scale, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
              }).start();
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Animated.View
              style={{
                transform: [{scale: scale}],
              }}>
              <Button
                
                link
                containerStyle={{
                  backgroundColor: 'transparent',
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  width: tabWidth,
                  padding: 0,
                }}
                backgroundColor="transparent"
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {label === 'Anasayfa' ? (
                  <View
                    style={
                      isFocused ? styles.activeIcon : styles.notActiveIcon
                    }>
                    <Icon
                      type="feather"
                      name="home"
                      size={tabSize}
                      color={isFocused ? 'white' : '#797979'}
                    />
                  </View>
                ) : label == 'Sepetim' ? (
                  <View
                    style={
                      isFocused ? styles.activeIcon : styles.notActiveIcon
                    }>
                    <Icon
                      type="feather"
                      name="shopping-cart"
                      size={tabSize}
                      color={isFocused ? 'white' : '#797979'}
                    />
                  </View>
                ) : label == 'Hareketler' ? (
                  <View
                    style={
                      isFocused ? styles.activeIcon : styles.notActiveIcon
                    }>
                    <Icon
                      type="feather"
                      name="list"
                      size={tabSize}
                      color={isFocused ? 'white' : '#797979'}
                    />
                  </View>
                ) : label == 'Ayarlar' ? (
                  <View
                    style={
                      isFocused ? styles.activeIcon : styles.notActiveIcon
                    }>
                    <Feather
                      name="user"
                      size={tabSize}
                      color={isFocused ? 'white' : '#797979'}
                    />
                  </View>
                ) : (
                  <View
                    style={
                      isFocused ? styles.activeIcon : styles.notActiveIcon
                    }>
                    <Feather
                      size={tabSize}
                      name="compass"
                      color={isFocused ? 'white' : '#797979'}
                    />
                  </View>
                )}
                {label == 'Faturamatik' ? null : (
                  <Text
                    size={12}
                    semibold
                    style={{
                      ...(isFocused ? activeTextStyle : passiveTextStyle),
                      marginTop: 2,
                    }}>
                    {label}
                  </Text>
                )}
                {label == 'Sepetim' && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 10,
                      backgroundColor: '#ff3f34',
                      width: 16,
                      height: 16,
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: 8,
                      justifyContent: 'center',
                    }}>
                    <Text size={10} medium color="white">
                      {basket.basket}
                    </Text>
                  </View>
                )}
              </Button>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    height: 70,
  },
  activeIcon: {
    backgroundColor: '#5876B7',
    width: 64,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  notActiveIcon: {
    backgroundColor: '#FAFAFA',
    width: 64,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  animatedView: {
    width: TAB_BAR_WIDTH,
    height: ANIMATED_PART_HEIGHT,
    backgroundColor: colors.primary,
  },
  animatedWrapper: { width: TAB_BAR_WIDTH, alignItems: 'center', justifyContent: 'center' },
});

//make this component available to the app
export default BottomBar;
