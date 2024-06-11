//import liraries
import {getUser, updateUser} from '@/api/user';
import {Text} from '@/components';
import Header from '@/components/Header/Header';
import {colors} from '@/config';
import {useAuth} from '@/contexts/auth/Context';
import {useLoading} from '@/contexts/loading/Context';
import useFetch from '@/hooks/useFetch';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {
  Button,
  Card,
  LoaderScreen,
  SkeletonView,
  Switch,
} from 'react-native-ui-lib';

// create a component

export interface NotificationSettingsProps {
  setModal: any;
  user: any;
}

const NotificationSettings = () => {
  const auth = useAuth();
  const loader = useLoading();
  const navigation = useNavigation();
  const [mobileNotification, setMobileNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [smsNotification, setSmsNotification] = useState(false);

  const [
    getUserQuery,
    {data: getUserData, error: getUserError, loading: getUserLoading},
  ] = useFetch<any>();

  const [
    updateUserMutation,
    {data: updateUserData, error: updateUserError, loading: updateUserLoading},
  ] = useFetch<any>();

  useEffect(() => {
    getUserQuery(getUser, {
      token: auth?.token,
    });
  }, []);

  useEffect(() => {
    if (getUserData) {
      setMobileNotification(
        getUserData[0].t_bildirim_mobil == '1' ? true : false,
      );
      setEmailNotification(
        getUserData[0].t_bildirim_mail == '1' ? true : false,
      );
      setSmsNotification(getUserData[0].t_bildirim_sms == '1' ? true : false);
    }
  }, [getUserData]);

  const successRef = React.useRef<any>(null);

  const handleUpdateUser = () => {
    updateUserMutation(updateUser, {
      token: auth?.token,
      phone: getUserData[0].t_gsm_no,
      email: getUserData[0].t_mail_adresi,
      mobileNotification: mobileNotification ? '1' : '0',
      mailNotification: emailNotification ? '1' : '0',
      smsNotification: smsNotification ? '1' : '0',
    });
  };

  useEffect(() => {
    if (updateUserData) {
      console.log(updateUserData);
      successRef.current?.open();
    }
  }, [updateUserData]);

  useEffect(() => {
    if (updateUserError) {
      console.log(updateUserError);
    }
  }, [updateUserError]);

  return (
    <View style={styles.container}>
      <Portal>
        <Modalize ref={successRef} snapPoint={350}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
            }}>
            <LottieView
              source={require('@/assets/animation/success.json')}
              autoPlay={true}
              loop={false}
              style={{width: 200, height: 200}}
            />
            <Text medium align="center" size={15} color="#484848">
              Bildirim Ayarları Güncellendi
            </Text>
            <Button
              style={{marginVertical: 5, width: '80%'}}
              backgroundColor={colors.primary}
              label="Tamam"
              onPress={() => {
                successRef.current?.close();
                navigation.goBack();
              }}
            />
          </View>
        </Modalize>
      </Portal>
      <Spinner visible={updateUserLoading} />
      <SafeAreaView style={{flex: 1, margin: 10}}>
        <Header title="Bildirim Ayarları" leftSide={true} />
        <Card
          loading={getUserLoading}
          enableShadow
          style={{
            padding: 10,
            marginTop: 20,
          }}>
          {getUserData && (
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <Text size={14} medium>
                  Mobil Bildirimleri
                </Text>
                <Switch
                  onColor={colors.primary}
                  value={mobileNotification}
                  onValueChange={(value: any) => {
                    setMobileNotification(value);
                  }}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <Text size={14} medium>
                  Sms Bildirimleri
                </Text>
                <Switch
                  onColor={colors.primary}
                  value={smsNotification}
                  onValueChange={(value: any) => {
                    setSmsNotification(value);
                  }}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <Text size={14} medium>
                  Email Bildirimleri
                </Text>
                <Switch
                  onColor={colors.primary}
                  value={emailNotification}
                  onValueChange={(value: any) => {
                    setEmailNotification(value);
                  }}
                />
              </View>
            </View>
          )}
        </Card>
        <Button
          onPress={handleUpdateUser}
          label="Kaydet"
          borderRadius={2}
          marginT-20
          backgroundColor={colors.primary}
          labelStyle={{fontWeight: 'bold'}}
        />
      </SafeAreaView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default NotificationSettings;
