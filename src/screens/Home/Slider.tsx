import _ from 'lodash';
import React, {Component} from 'react';
import { Image } from 'react-native';
import {StyleSheet, ScrollView} from 'react-native';
import {
  Constants,
  Spacings,
  View,
  Text,
  Carousel,
  
  Colors,
} from 'react-native-ui-lib';

const Slider = ({items}: any) => {
  const ref = React.useRef(null);

  const onChange = (index: number) => {
    ref?.current?.goToPage(index), true;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Carousel
        key={items.length}
        ref={ref}
        loop
        autoplay={true}
        onChangePage={onChange}
        pageWidth={Constants.windowWidth}
        itemSpacings={Spacings.s1}
        autoplayInterval={2500}
        containerMarginHorizontal={0}
        initialPage={1}
        containerStyle={{height: 200}}
        pageControlPosition={Carousel.pageControlPositions.UNDER}
        pageControlProps={{
          onPagePress: onChange,
          limitShownPages: false,
        }}
        
        allowAccessibleLayout>
        {items?.map((item: any, index: number) => {
          return (
            <View style={{ overflow:"hidden",borderRadius:10 }} key={index}>
              <Image
                source={{uri: item.p_dosya_url}}
                resizeMethod="resize"
                height={170}
                style={{width: '100%',resizeMode:"contain",borderRadius:10}}
              />
            </View>
          );
        })}
      </Carousel>
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

export default Slider;
