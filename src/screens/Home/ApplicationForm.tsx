//import liraries
import {apiPost} from '@/api';
import {applicationHandle} from '@/api/blog';
import {Text} from '@/components';
import {colors} from '@/config';
import {useAuth} from '@/contexts/auth/Context';
import useFetch from '@/hooks/useFetch';
import {color} from '@rneui/base';
import LottieView from 'lottie-react-native';
import React, {Component, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {Button, TextField} from 'react-native-ui-lib';

export interface ApplicationFormProps {
  t_paket_id: any;
  t_baslik: any;
  closeRef: any;
}

// create a component
const ApplicationForm = (props: ApplicationFormProps) => {
  const auth = useAuth();
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [t_tc_no, setTcNo] = React.useState('');
  const [t_basvuru_notu, setBasvuruNotu] = React.useState('');
  const successRef = React.useRef<any>();
  const errorRef = React.useRef<any>();

  const [
    applicationMutation,
    {
      loading: applicationLoading,
      error: applicationError,
      data: applicationData,
    },
  ] = useFetch<any>();

  const handleApp = () => {
    applicationMutation(applicationHandle, {
      token: auth?.token,
      t_paket_id: props.t_paket_id,

      t_kayit_kaynagi: 'Mobil - FTM',
      t_basvuru_notu: t_basvuru_notu,

      t_ad: name,
      t_soyad: surname,
      t_tc_no: t_tc_no,
      t_gsm_no: phone,
      t_mail_adresi: email,
    });
  };

  useEffect(() => {
    if (applicationData) {
      if (applicationData[0].sonuc == 200) {
        successRef.current?.open();
      } else {
        errorRef.current?.open();
      }
    }
  }, [applicationData]);

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
              style={{width: 250, height: 250}}
            />
            <Text medium align="center" size={15} color="#484848">
              {applicationData && applicationData[0].mesaj}
            </Text>
            <Button
              style={{marginVertical: 5, width: '80%'}}
              backgroundColor={colors.primary}
              label="Tamam"
              onPress={() => {
                successRef.current?.close();
                props.closeRef.current?.close();
              }}
            />
          </View>
        </Modalize>
      </Portal>
      <Portal>
        <Modalize ref={errorRef} snapPoint={350}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
            }}>
            <LottieView
              source={require('@/assets/animation/error.json')}
              autoPlay={true}
              loop={false}
              style={{width: 200, height: 200}}
            />
            <Text medium align="center" size={15} color="#484848">
              {applicationData && applicationData[0].aciklama}
            </Text>
            <Button
              style={{marginVertical: 10, width: '80%'}}
              backgroundColor={colors.primary}
              label="Tamam"
              onPress={() => {
                errorRef.current?.close();
              }}
            />
          </View>
        </Modalize>
      </Portal>
      <Text style={{fontWeight: 'bold'}}>{props.t_baslik}</Text>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <TextField
          style={{
            borderBottomWidth: 1,
            borderColor: 'gray',
            paddingBottom: 5,
          }}
          placeholder={'Adınız'}
          floatingPlaceholder
          onChangeText={value => setName(value)}
          enableErrors
          validate={['required']}
          validationMessage={['Bu alan boş bırakılamaz']}
        />

        <TextField
          style={{
            borderBottomWidth: 1,
            borderColor: 'gray',
            paddingBottom: 10,
            marginTop: 5,
          }}
          placeholder={'Soyadınız'}
          floatingPlaceholder
          onChangeText={value => setSurname(value)}
          enableErrors
          validate={['required']}
          validationMessage={['Bu alan boş bırakılamaz']}
        />
        <TextField
          style={{
            borderBottomWidth: 1,
            borderColor: 'gray',
            paddingBottom: 10,
            marginTop: 5,
          }}
          placeholder={'Telefon Numaranız'}
          floatingPlaceholder
          onChangeText={value => setPhone(value)}
          enableErrors
          validate={['required']}
          keyboardType="phone-pad"
          validationMessage={['Bu alan boş bırakılamaz']}
        />
        <TextField
          style={{
            borderBottomWidth: 1,
            borderColor: 'gray',
            paddingBottom: 10,
            marginTop: 5,
          }}
          placeholder={'T.C. Kimlik Numaranız'}
          floatingPlaceholder
          onChangeText={value => setTcNo(value)}
          enableErrors
          validate={['required']}
          keyboardType="phone-pad"
          validationMessage={['Bu alan boş bırakılamaz']}
        />
        <TextField
          style={{
            borderBottomWidth: 1,
            borderColor: 'gray',
            paddingBottom: 10,
            marginTop: 5,
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={'E-Posta Adresiniz'}
          floatingPlaceholder
          onChangeText={value => setEmail(value)}
          enableErrors
          validate={['required', 'email']}
          validationMessage={[
            'Bu alan boş bırakılamaz',
            'Geçerli bir e-posta adresi giriniz',
          ]}
        />
        <TextField
          style={{
            borderBottomWidth: 1,
            borderColor: 'gray',
            paddingBottom: 10,
            marginTop: 5,
          }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={'Başvuru Notunuz'}
          floatingPlaceholder
          onChangeText={value => setBasvuruNotu(value)}
          enableErrors
          validate={['required']}
          validationMessage={[
            'Bu alan boş bırakılamaz',
            'Geçerli bir e-posta adresi giriniz',
          ]}
        />
        <TouchableOpacity
          onPress={() => handleApp()}
          style={{
            width: '100%',
            height: 56,
            backgroundColor: '#1E232C',
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {applicationLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{color: 'white'}}>Başvur</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

//make this component available to the app
export default ApplicationForm;
