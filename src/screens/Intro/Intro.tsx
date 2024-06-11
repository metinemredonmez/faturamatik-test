
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Appearance, ImageBackground, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Image } from 'react-native-ui-lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLottieView from 'lottie-react-native';
import { useAuth } from '@/contexts/auth/Context';
import { Text } from '@/components';
import { colors } from '@/config';
import { useNavigation } from '@react-navigation/native';
const slides = [


    {
        key: 'three',
        title: 'Ortak Ödeme Platformu',
        text: `Tüm kurumların ortak ödeme platformu!
        450'den fazla kurum. 
        Kira, aidat, su, elektrik, telefon, doğalgaz,
        gsm, dijital yayın.`,
        animation: require('@/assets/animation/step-1.json'),
        backgroundColor: '#22bcb5',
    },
    {
        key: 'two',
        title: `Taksit Taksit
        Ödeme Seçeneği`,
        text: `Fatura, kira ve aidatınızı öderken
        9 aya varan taksit seçeneklerini değerlendirebilir,
        ödemelerinizi rahatlıkla yapabilirsiniz.`,
        animation: require('@/assets/animation/step-1.json'),
        backgroundColor: '#febe29',
    },
    {
        key: 'one',
        title: `Avantajlı
        Kampanyalar`,
        text: `Digiturk, Pronet ve daha birçok avantajlı
        kampanyadan haberdar olun, indirimli
        paketlerimizi kaçırmayın!`,
        animation: require('@/assets/animation/step-1.json'),
        backgroundColor: '#59b2ab',
    },
];

const AppIntro = () => {
    const navigation = useNavigation();
    const auth = useAuth();
    const [loading, setLoading] = useState(true);


    const fetchIntro = async () => {
        try {
            const value = await AsyncStorage.getItem('isIntro');
            if (value !== null) {
                auth.setIsIntro(true);
                navigation.navigate('Login');
                
            }
            else {
                setLoading(false);
            }
        } catch (e) {
            // error reading value
        }
    }

    useEffect(() => {
        fetchIntro();
    }, []);


    const _renderItem = ({ item }:any) => {
        return (
            <View style={styles.slide}>
                <Text align="center" style={styles.title}>{item.title}</Text>
                <Text align="center" style={styles.text}>{item.text}</Text>
                <AnimatedLottieView
                    source={item.animation}
                    autoPlay
                    loop
                    style={{
                        width: 300,
                        height: 300,
                    }}
                />
            </View>
        );
    }
    const _onDone = async () => {

        try {
            await AsyncStorage.setItem('isIntro', 'yes');

            auth.setIsIntro(true);
            navigation.navigate('Login');
        }
        catch (e) {

        }
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={colors.black} />
            </View>
        )
    }

    return (

        <>
            <StatusBar hidden={true} />
            <ImageBackground source={require('@/assets/images/intro/bg.png')} style={styles.bg}>
                <AppIntroSlider

                    dotStyle={{
                        backgroundColor: "#D9E2EB",

                    }}
                    activeDotStyle={{
                        backgroundColor: colors.primary,
                        width: 30
                    }}
                    renderNextButton={() => (
                        <View style={styles.renderNextButton}>
                            <Text style={{
                                color: colors.white,
                                fontFamily: "Poppins-Regular"
                            }}>İleri</Text>
                        </View>
                    )}
                    renderDoneButton={() => (
                        <View style={styles.renderNextButton}>
                            <Text style={{
                                color: colors.white,
                                fontFamily: "Poppins-Regular"
                            }}>Başla</Text>
                        </View>
                    )}
                    renderItem={_renderItem} data={slides} onDone={_onDone} />
            </ImageBackground>
        </>
    );

}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',

    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    title: {
        fontSize: 25,
        color: colors.primary,
        marginTop: 20,
        marginBottom: 10,
        textAlign: "center",
        fontFamily: "Poppins-Bold",
    },
    text: {
        color: Appearance.getColorScheme() === 'dark' ? colors.white : colors.black,
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,

        textAlign: 'center',
        fontFamily: "Poppins-Medium"
    },
    renderNextButton: {
        width: 80,
        height: 40,
        backgroundColor: colors.primary,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AppIntro;