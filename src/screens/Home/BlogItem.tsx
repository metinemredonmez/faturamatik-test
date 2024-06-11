//import liraries
import {Text} from '@/components';
import {colors} from '@/config';
import {Icon} from '@rneui/themed';
import React, {Component} from 'react';
import {View, StyleSheet, Platform, Image, Dimensions} from 'react-native';
import {Card} from 'react-native-ui-lib';

// create a component

export interface BlogItemProps {
  t_tarih: string;
  t_kategori: string;
  t_baslik: string;
  t_ozet: string;
  t_icerik: string;
  index: number;
  p_dosya_url: string;
}

const BlogItem = (props: BlogItemProps) => {
  const {
    t_tarih,
    t_kategori,
    t_baslik,
    t_ozet,
    t_icerik,
    p_dosya_url,
  } = props;
  const styles = StyleSheet.create({
    container: {
      maxWidth: Dimensions.get('window').width / 2 - 20,
      padding: 10,
      marginTop: 10,
      borderRadius: 5,
      ...(props.index == 0 ? {marginRight: 10} : {marginHorizontal: 10}),
    },
    blogItem: {
      width: 160,
      backgroundColor: 'white',
      marginRight: 10,
    },
    blogDetailButton: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    blogImageContainer: {
      width: '100%',
    },
    blogImage: {
      width: 160,
      height: 100,
      borderRadius: 10,
      resizeMode: 'cover',
    },
    blogDesriptionContainer: {
      marginBottom: 15,
      width: '100%',

      marginTop: 10,
      paddingHorizontal: 10,
    },
    itemTitle: {
      fontFamily: 'Ubuntu-Bold',
      marginLeft: 10,
    },
    blogImageItem: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    descriptionContainer: {
      padding: 10,
    },
    blogTitle: {
      fontSize: 12,
      fontFamily: 'Poppins-Medium',
      paddingBottom: 5,
      height: 40,
      flexWrap: 'wrap',
      flex: 1,
    },
    blogDescription: {
      fontSize: 9,
      fontFamily: 'Ubuntu-Regular',
      color: '#7E7E7E',
      height: 20,
    },
    blogButton: {
      width: '100%',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      height: 40,
      backgroundColor: colors.primary,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      zIndex: 10,
      elevation: 10,
      ...Platform.select({
        ios: {
          marginTop: -20,
        },
        android: {
          marginTop: -20,
        },
      }),
    },
  });
  let titleReplace = t_baslik.replace(/&quot;/g, '"');
  let descriptionReplace = t_ozet?.replace(/&quot;/g, '"');
  return (
    <Card enableShadow style={styles.container}>
      <View style={styles.blogImageContainer}>
        <Image
          style={styles.blogImage}
          source={{uri: `https://${p_dosya_url}`}}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.blogTitle}>{titleReplace}</Text>
        </View>
        <Text size={12} medium style={styles.blogDescription}>
          {descriptionReplace !== null
            ? descriptionReplace.substr(0, 50)
            : null}
          ...
        </Text>
        <View style={styles.blogDetailButton}>
          <Text
            style={{
              color: colors.primary,
              fontFamily: 'Ubuntu-Medium',
              fontSize: 12,
            }}>
            Detaylar
          </Text>
          <Icon
            type="feather"
            name="arrow-right"
            size={15}
            color={colors.primary}
          />
        </View>
      </View>
    </Card>
  );
};

// define your styles

//make this component available to the app
export default BlogItem;