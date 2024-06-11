//import liraries
import {Text} from '@/components';
import Header from '@/components/Header/Header';
import {colors} from '@/config';
import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  Modal,
  FlatList,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Button, Card, RadioButton, TouchableOpacity} from 'react-native-ui-lib';
import MonthComponent from './Month';
import {Portal} from 'react-native-portalize';
import YearComponent from './Year';
import MaskInput from 'react-native-mask-input';
import {Icon} from '@rneui/themed';
import {useAuth} from '@/contexts/auth/Context';
import useFetch from '@/hooks/useFetch';
import {listBaskets} from '@/api/basket';
import Summary from './Summary';
import {useLoading} from '@/contexts/loading/Context';
import Installment from './Installment';
import {addPayment} from '@/api/payment';
import {Picker, DatePicker} from 'react-native-wheel-pick';

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

// create a component
const CardForm = () => {
  const auth = useAuth();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const loader = useLoading();

  console.log(route.params);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loader.setLoading(false);
    });

    return unsubscribe;
  }, [navigation]);

  const [errors, setErrors] = useState<any | []>([]);
  const [cardName, setCardName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardMonth, setCardMonth] = useState<string>('');
  const [cardYear, setCardYear] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');
  const [installmentModal, setInstallmentModal] = useState<any>(null);
  const [selectedInstallment, setSelectedInstallment] = useState<any>(null);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const [errorVisible, setErrorVisible] = useState<boolean>(false);

  const [
    installmentListQuery,
    {
      data: installmentListQueryData,
      error: installmentListQueryError,
      loading: installmentListQueryLoading,
    },
  ] = useFetch<any>();

  const [
    listBasketsQuery,
    {
      data: listBasketsQueryData,
      error: listBasketsQueryError,
      loading: listBasketsQueryLoading,
    },
  ] = useFetch<any>();

  const [
    paymentMutation,
    {
      data: paymentMutationData,
      error: paymentMutationError,
      loading: paymentMutationLoading,
    },
  ] = useFetch<any>();

  const monthModal = useRef<any>(null);
  const yearModal = useRef<any>(null);
  const summaryModal = useRef<any>(null);

  useEffect(() => {
    listBasketsQuery(listBaskets, {
      token: auth?.token,
    });
  }, []);

  useEffect(() => {
    setSelectedInstallment(null);
  }, [cardNumber]);

  useEffect(() => {
    if (listBasketsQueryLoading) {
      loader.setLoading(true);
    } else {
      loader.setLoading(false);
    }
  }, [listBasketsQueryLoading]);

  useEffect(() => {
    if (installmentListQueryLoading) {
      loader.setLoading(true);
    } else {
      loader.setLoading(false);
    }
  }, [installmentListQueryLoading]);

  useEffect(() => {
    if (installmentListQueryData) {
      if (
        installmentListQueryData[0]?.taksit_secenekleri &&
        installmentListQueryData[0]?.taksit_secenekleri.length > 0
      ) {
        setSelectedInstallment(null);
        setInstallmentModal(true);
      }
    } else {
      console.log('installmentListQueryData', installmentListQueryData);
    }
  }, [installmentListQueryData]);

  useEffect(() => {
    if (installmentListQueryError) {
      console.log(installmentListQueryError);
    }
  }, [installmentListQueryError]);

  useEffect(() => {}, [selectedInstallment]);

  const handleInstallment = () => {
    if (!selectedInstallment) {
      installmentListQuery(listBaskets, {
        token: auth?.token,
        cardNumber: cardNumber.split(' ').join('-'),
      });
    } else {
      paymentMutation(addPayment, {
        token: auth?.token,
        cardNumber: cardNumber.split(' ').join('-'),
        cardHolder: cardName,
        cardExpireMonth: cardMonth.substring(0, 2),
        cardExpireYear: cardMonth.substring(3, 5),
        cardCvv: cardCvc,
        cardName: installmentListQueryData[0]?.taksit_secenekleri.find(
          (item: any) => item.t_taksit_sayisi === selectedInstallment,
        )?.t_kart_adi,
        cardType: installmentListQueryData[0]?.taksit_secenekleri.find(
          (item: any) => item.t_taksit_sayisi === selectedInstallment,
        )?.t_kart_tipi,
        cardId: installmentListQueryData[0]?.taksit_secenekleri.find(
          (item: any) => item.t_taksit_sayisi === selectedInstallment,
        )?.t_kart_id,
        installment: installmentListQueryData[0]?.taksit_secenekleri.find(
          (item: any) => item.t_taksit_sayisi === selectedInstallment,
        )?.t_taksit_sayisi,
      });
    }
  };

  useEffect(() => {
    if (paymentMutationData) {
      if (paymentMutationData.sonuc == '200') {
        navigation.navigate('WebViewPage', {
          url: paymentMutationData.PaymentLink,
          OrderId: paymentMutationData.OrderId,
        });
      }
    }
  }, [paymentMutationData]);

  useEffect(() => {
    if (paymentMutationError) {
      console.log(paymentMutationError);
    }
  }, [paymentMutationError]);

  useEffect(() => {
    if (paymentMutationLoading) {
      loader.setLoading(true);
    } else {
      loader.setLoading(false);
    }
  }, [paymentMutationLoading]);

  useEffect(() => {
    if (route.params?.error) {
      setErrorVisible(true);
    }
  }, [route.params?.error]);

  const RenderButtons = () => {
    return (
      <View
        style={{marginVertical: 10, display: 'flex', flexDirection: 'column'}}>
        <TouchableOpacity
          onPress={() => setErrorVisible(false)}
          style={{
            backgroundColor: colors.primary,
            padding: 10,
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text size={12} medium color="white">
            Tekrar Dene
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ 
        position:"absolute",
        top:0,
        left:0,
        right:0,
        bottom:0,
        zIndex:999,
        backgroundColor:"rgba(0,0,0,0.5)",
        display:paymentMutationLoading ? "flex" : "none",
        alignItems:"center",
        justifyContent:"center"


       }}>
          <ActivityIndicator color="white" size="large" />
      </View>
      {route.params?.error && (
        <ErrorMessage
          description={route.params?.error}
          visible={errorVisible}
          title="Hata"
          buttons={<RenderButtons />}
        />
      )}
      <Modal
        visible={installmentModal}
        presentationStyle="fullScreen"
        animationType="slide">
        <SafeAreaView style={{flex: 1, backgroundColor: 'white', margin: 20}}>
          {installmentListQueryData &&
            installmentListQueryData[0] &&
            installmentListQueryData[0]?.taksit_secenekleri && (
              <View style={styles.installmentItem}>
                <Text size={17} bold color="#484848">
                  Taksit Seçenekleri
                </Text>
                <FlatList
                  data={installmentListQueryData[0]?.taksit_secenekleri}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      useNative={Platform.OS === 'ios'}
                      onPress={() =>
                        setSelectedInstallment(item.t_taksit_sayisi)
                      }>
                      <Installment item={item} selected={selectedInstallment} />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}
          <Button
            style={{borderRadius: 5}}
            backgroundColor={colors.black}
            label="Devam Et"
            labelStyle={{
              fontFamily: 'Poppins-Medium',
              fontWeight: 'bold',
              fontSize: 15,
              color: 'white',
            }}
            onPress={() => {
              if (!selectedInstallment) {
                Alert.alert('Faturamatik', 'Lütfen taksit seçiniz.');
                return;
              } else {
                setInstallmentModal(false);
              }
            }}
          />
        </SafeAreaView>
      </Modal>
      <Portal>
        <Modalize
          ref={monthModal}
          handlePosition="inside"
          modalHeight={300}
          HeaderComponent={
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
              }}>
              <View>
                <Text size={15} medium color="#8391A1">
                  Kapat
                </Text>
              </View>
              <TouchableOpacity onPress={() => monthModal.current?.close()}>
                <Text size={15} medium color="#8391A1">
                  Seç
                </Text>
              </TouchableOpacity>
            </View>
          }>
          <MonthComponent
            onChange={value => setCardMonth(value)}
            value={cardMonth}
          />
        </Modalize>
        <Modalize
          ref={yearModal}
          handlePosition="inside"
          modalHeight={300}
          HeaderComponent={
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
              }}>
              <View>
                <Text size={15} medium color="#8391A1">
                  Kapat
                </Text>
              </View>
              <TouchableOpacity onPress={() => yearModal.current?.close()}>
                <Text size={15} medium color="#8391A1">
                  Seç
                </Text>
              </TouchableOpacity>
            </View>
          }>
          <YearComponent
            onChange={value => setCardYear(value)}
            value={cardYear}
          />
        </Modalize>
      </Portal>
      <SafeAreaView style={{margin: 10}}>
        <Header title="Ödeme Bilgileri" leftSide />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}>
          <View
            style={{
              backgroundColor: colors.red,
              padding: 10,
              borderRadius: 10,
              marginVertical: 10,
            }}>
            <Text size={12} regular color="white">
              Taksit seçenekleri görmek için kart bilgilerinizi girip devam et
              butonuna tıklayınız.
            </Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.formGroup}>
              <Text size={12} medium color="#484848" style={styles.label}>
                Kart Üzerindeki İsim
              </Text>
              <TextInput
                value={cardName}
                onChangeText={setCardName}
                style={{
                  ...styles.input,
                  ...(errors.includes('cardName') ? styles.errorInput : {}),
                }}
                autoCorrect={false}
              />
              {errors.includes('cardName') && (
                <Text medium size={11} color={colors.error}>
                  Bu alan zorunludur
                </Text>
              )}
            </View>
            <View style={styles.formGroup}>
              <Text size={12} medium color="#484848" style={styles.label}>
                Kart Numarası
              </Text>
              <MaskInput
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  ' ',
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  ' ',
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  ' ',
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                returnKeyLabel="done"
                returnKeyType="done"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
                style={{
                  ...styles.input,
                  ...(errors.includes('cardNumber') ? styles.errorInput : {}),
                }}
              />
              {errors.includes('cardNumber') && (
                <Text medium size={11} color={colors.error}>
                  Bu alan zorunludur
                </Text>
              )}
            </View>
            <View style={styles.flexFormGroup}>
              <View
                style={{
                  ...styles.formGroup,
                  width: '59%',
                }}>
                <Text size={12} medium color="#484848" style={styles.label}>
                  Son Kullanma Tarihi (Ay/Yıl)
                </Text>
                <View
                  style={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                  }}>
                  <MaskInput
                    mask={[/\d/,/\d/, '/', /\d/,/\d/]}
                    keyboardType="numeric"
                    returnKeyLabel="done"
                    returnKeyType="done"
                    value={cardMonth}
                    onChangeText={setCardMonth}
                    style={{
                      ...styles.input,
                      width: '100%',
                      ...(errors.includes('cardMonth')
                        ? styles.errorInput
                        : {}),
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  ...styles.formGroup,
                  width: '40%',
                  position: 'relative',
                }}>
                <Text size={12} medium color="#484848" style={styles.label}>
                  CVC
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                  }}>
                  <MaskInput
                    mask={[/\d/, /\d/, /\d/]}
                    keyboardType="numeric"
                    returnKeyLabel="done"
                    returnKeyType="done"
                    value={cardCvc}
                    onChangeText={setCardCvc}
                    style={{
                      ...styles.input,
                      width: '70%',
                      ...(errors.includes('cardCvc') ? styles.errorInput : {}),
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'Faturamatik',
                        'Kartınızın arkasında bulunan 3 haneli güvenlik kodudur.',
                      );
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 30,
                      backgroundColor: colors.primary,
                      padding: 5,
                      borderRadius: 100,
                      height: 30,
                    }}>
                    <Icon
                      type="evilicon"
                      name="question"
                      size={20}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
                {errors.includes('cardCvc') && (
                  <Text medium size={11} color={colors.error}>
                    Bu alan zorunludur
                  </Text>
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setInstallmentModal(true)}
            style={{
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 10,
              marginVertical: 10,
              display: selectedInstallment ? 'flex' : 'none',
            }}>
            <Text size={12} regular color="white">
              Taksit sayısını değiştir.
            </Text>
          </TouchableOpacity>
          <Card
            onPress={() => setShowSummary(!showSummary)}
            enableShadow
            color="white"
            style={{
              borderRadius: 10,
              padding: 10,

              marginTop: 10,
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text  size={15} medium>
                Özet
              </Text>
              <Icon
                type="evilicon"
                name={showSummary ? 'chevron-up' : 'chevron-down'}
                size={30}
                color={colors.primary}
              />
            </View>
            {listBasketsQueryData && listBasketsQueryData?.length > 0 && (
              <View
                style={{marginTop: 10, display: showSummary ? 'flex' : 'none'}}>
                <Summary
                  setInstallmentModal={setInstallmentModal}
                  selectedInstallment={
                    installmentListQueryData
                      ? installmentListQueryData[0]?.taksit_secenekleri.find(
                          (item: any) =>
                            item.t_taksit_sayisi === selectedInstallment,
                        )
                      : null
                  }
                  serviceFee={listBasketsQueryData[0]?.p_hizmet_bedeli.toString()}
                  invocies={listBasketsQueryData[0]?.fatura_bilgileri ?? []}
                />
              </View>
            )}
          </Card>
          <TouchableOpacity
            
            onPress={() => handleInstallment()}
            style={styles.button}>
            <Text size={15} medium color="white">
              {paymentMutationLoading || installmentListQueryLoading ? (
                <ActivityIndicator color="white" />
              ) : selectedInstallment ? (
                'Taksit Seçildi Devam Et'
              ) : (
                'Devam Et'
              )}
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
  cardContainer: {
    padding: 10,
    backgroundColor: '#f5f6f9',
    borderRadius: 5,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },
  input: {
    borderWidth: 0.5,
color:"#484848",
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 5,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    borderColor: '#dedede',
    width: '100%',
    marginTop: 5,
  },
  errorinput: {
    borderWidth: 0.5,
color:"#484848",
    backgroundColor: colors.error,
  },
  flexFormGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  installmentContainer: {
    marginTop: 10,
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#1E232C',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

//make this component available to the app
export default CardForm;
