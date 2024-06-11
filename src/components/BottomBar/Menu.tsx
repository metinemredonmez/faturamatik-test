//import liraries
import React, {Component, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface MenuProps {
  active: boolean;
  children?: React.ReactNode;
}
const Menu = (props: MenuProps) => {
  const opacity = useSharedValue(0);
  const height = useSharedValue(0);
  const translateY = useSharedValue(50);

  const style = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      height: height.value,
      transform: [{translateY: translateY.value}],
    };
  });

  useEffect(() => {
    if (props.active) {
      opacity.value = withTiming(1, {duration: 200});
      translateY.value = withTiming(0, {duration: 200});
      height.value = withTiming(20, {duration: 200});
    } else {
      opacity.value = withTiming(0, {duration: 200});
      translateY.value = withTiming(0, {duration: 200});
      height.value = withTiming(0, {duration: 200});
    }
  }, [props.active]);

  return (
    <View>
      <Animated.View
        style={{
          ...style,
        }}>
        {props.children}
      </Animated.View>
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
export default Menu;
