import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView, Platform, Dimensions, FlatList} from 'react-native';
import {
  Constants,
  Spacings,
  View,
  Carousel,
  Image,
  Colors,
  Button,
} from 'react-native-ui-lib';

import OpenMap from 'react-native-open-maps';
import {Text} from '@/components';

const MapSlider = ({items, onScroll}: any) => {
  const ref = React.useRef(null);


  const flatListRef = React.useRef(null);

  const viewConfig = React.useRef({viewAreaCoveragePercentThreshold: 50});

  const viewableItemsChanged = React.useRef(
    ({viewableItems}: any) => {},
  ).current;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FlatList
        style={{ height:250 }}
        ref={flatListRef}
        data={items}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        onScroll={onScroll}
        initialNumToRender={0}
        bounces={false}
        viewabilityConfig={viewConfig.current}
        onViewableItemsChanged={viewableItemsChanged}
        renderItem={({item, index}: any) => {
          return (
            <View
              style={{
                height: 200,
                backgroundColor: 'white',
                borderRadius: 10,
                marginHorizontal: 5,

                padding: 10,
                elevation: 5,
                width: Dimensions.get('window').width - 10,
              }}>
              <Text size={12} bold>
                {item.Name}
              </Text>
              <View style={{marginTop: 5}}>
                <Text size={12} medium>
                  {item.Address}
                </Text>
              </View>

              <View
                style={{
                  position: 'absolute',
                  bottom: 70,
                  padding: 10,
                  width: 100 + '%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <ButtonComponent
                  onPress={() => {
                    OpenMap({
                      latitude: item.Latitude,
                      longitude: item.Longitude,
                      zoom: 18,
                      title: item.Name,
                      query: item.Address,
                      provider: Platform.OS === 'ios' ? 'apple' : 'google',
                      end: item.Address,
                      travelType: 'drive',
                    });
                  }}
                  title={'Yol Tarifi Al'}
                /> */}
              </View>
            </View>
          );
        }}
        keyExtractor={(item: any, index: any) => index.toString()}
      />
    </ScrollView>
  );
};

// @ts-ignore
const Page = ({children, style, ...others}) => {
  return (
    <View {...others} style={[styles.page, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    marginHorizontal: 20,
  },
  page: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
  },
  loopCarousel: {
    position: 'absolute',
    bottom: 15,
    left: 10,
  },
});

export default MapSlider;
