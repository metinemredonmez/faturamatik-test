//import liraries
import {Text} from '@/components';
import {colors} from '@/config';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import moment from 'moment';
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import RenderHTML from 'react-native-render-html';
import {Card} from 'react-native-ui-lib';

// create a component
const BlogDetail = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();

  const {
    t_tarih,
    t_kategori,
    t_baslik,
    t_kisa_icerik,
    t_icerik,
    p_dosya_url,
  } = route.params;

  const value = useSharedValue(1);

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: value.value,
    };
  });

  const scrollRef = React.useRef<any>();

  return (
    <View style={styles.viewContainer}>
      <SafeAreaView style={{flex: 1, margin: 10, backgroundColor: 'white'}}>
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              name="chevron-left"
              type="feather"
              size={24}
              color="#1E232C"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text size={17} medium color="#484848">
            {t_baslik}
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text size={12} medium color="#484848">
            <Icon name="calendar" type="feather" size={12} color="#484848" />
            {moment(t_tarih).format('DD.MM.YYYY')}
          </Text>
        </View>
        <ScrollView
          onScroll={e => {
            if (e.nativeEvent.contentOffset.y > 100) {
              value.value = 0;
            } else {
              value.value = 1;
            }
          }}
          showsVerticalScrollIndicator={false}
          ref={scrollRef}>
          <Animated.View style={opacityStyle}>
            <Card enableShadow style={styles.image}>
              <Image
                source={{uri: 'https://' + p_dosya_url}}
                style={{width: '100%', height: '100%'}}
              />
            </Card>
          </Animated.View>
          <RenderHTML contentWidth={Dimensions.get('window').width} source={{html: t_icerik}} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  navigationContainer: {
    height: 50,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  back: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.borderColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    overflow: 'hidden',
    borderRadius: 10,
  },
});

//make this component available to the app
export default BlogDetail;