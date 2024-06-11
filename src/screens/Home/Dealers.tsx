//import liraries
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Linking,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  ToastAndroid,
  TouchableOpacity,
  View,
  Animated,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import MapView from './MapView';

import OpenMap from 'react-native-open-maps';

import {createOpenLink} from '@/config/map';
import {Icon} from '@rneui/themed';
import {Text} from '@/components';
import {colors} from '@/config';
import axios from 'axios';
import {Carousel} from 'react-native-ui-lib';
import MapSlider from './MapSlider';
import Spinner from 'react-native-loading-spinner-overlay';

// create a component
const Dealers = () => {
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(false);
  const [observing, setObserving] = useState(false);
  const [foregroundService, setForegroundService] = useState(false);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const [data, setData] = useState<any | []>([]);
  const [loading, setLoading] = useState(false);

  const watchId = useRef(null);

  useEffect(() => {
    return () => {
      removeLocationUpdates();
    };
  }, [removeLocationUpdates]);

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Konum izni reddedildi', ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Konum izni reddedildi.', ToastAndroid.LONG);
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
      },
    );
  };

  const removeLocationUpdates = useCallback(() => {
    // if (watchId.current !== null) {
    //      stopForegroundService();
    //      Geolocation.clearWatch(watchId.current);
    //      watchId.current = null;
    //      setObserving(false);
    // }
  }, []);

  const getAllLocation = async () => {
    var data = `
              <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bay="https://www.faturamatik.com.tr/servisler/BayiBilgisi">
              <soapenv:Header/>
              <soapenv:Body>
              <bay:GetAllAgentLocationsForMobileV2>
              <bay:creds>
              <bay:UserName>fmMobile</bay:UserName>
              <bay:Password>!f@tuR@mAT!k</bay:Password>
              <bay:SecurePassword/>
              <bay:Domain></bay:Domain>
              </bay:creds>
              <bay:enlem>40.929734</bay:enlem>
              <bay:boylam>29.1461583</bay:boylam>
              <bay:zoom>1</bay:zoom>
              </bay:GetAllAgentLocationsForMobileV2>
              </soapenv:Body>
              </soapenv:Envelope>
         `;

    // var config = {
    //      method: 'post',
    //      url: 'https://www.faturamatik.com.tr/kurumsal/servisler/BayiBilgisi.asmx',
    //      headers: {
    //           'User-Agent': 'Fiddler',
    //           'Host': 'faturamatik.com.tr',
    //           'Content-Length': data.length,
    //           'Content-Type': 'text/xml',
    //           'Accept': 'application/json'
    //      },
    //      data: data
    // };
    setLoading(true);
    const response = await fetch(
      'https://sistem.faturamatik.com.tr/v1/BayiBilgisi.asmx',
      {
        method: 'POST',
        headers: {
          'User-Agent': 'Fiddler',
          Host: 'faturamatik.com.tr',
          'Content-Length': data.length,
          'Content-Type': 'text/xml',
          Accept: 'application/json',
        },
        body: data,
      },
      setLoading(false),
    );

    const responseResult = await response.text();

    // let parseData = responseJson.replace('</GetAllAgentLocationsForMobileV2Result></GetAllAgentLocationsForMobileV2Response></soap:Body></soap:Envelope>');
    // parseData = parseData.replace('<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><GetAllAgentLocationsForMobileV2Response xmlns="https://www.faturamatik.com.tr/servisler/BayiBilgisi"><GetAllAgentLocationsForMobileV2Result>', '');
    // parseData = parseData.replace('undefined', '');
    // parseData = JSON.parse(JSON.stringify(parseData));

    let result: any = responseResult;
    result = result.split('<GetAllAgentLocationsForMobileV2Result>');
    result = result[1].split('</GetAllAgentLocationsForMobileV2Result>');

    setData(JSON.parse(result[0]).Agents);
  };

  useEffect(() => {
    getAllLocation();
    getLocation();
  }, []);

  const dealersRef = React.useRef();

  const carouselRef = React.useRef(null);

  const width = Dimensions.get('window').width;

  const flatListRef = React.useRef<any>(null);

  const screenWidth = Dimensions.get('window').width;

  const indexRef = React.useRef(0);

  

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const onScroll = (event: any) => {
    const ind = event.nativeEvent.contentOffset.x / screenWidth;
    const roundIndex: any = Math.round(ind);
    indexRef.current = roundIndex; // update indexRef when flatList is scrolled
    // {"coords": {"accuracy": 5, "altitude": 0, "altitudeAccuracy": -1, "heading": -1, "latitude": 40.929734, "longitude": 29.1461583, "speed": -1}, "timestamp": 1665492856768.186}

    Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
      useNativeDriver: false,
    });

    setLocation({
      coords: {
        latitude: data[roundIndex].Latitude,
        longitude: data[roundIndex].Longitude,
        accuracy: 5,
        altitude: 0,
        altitudeAccuracy: -1,
        heading: -1,
        speed: -1,
      },
    });
  };

  const viewConfig = React.useRef({viewAreaCoveragePercentThreshold: 50});

  const viewableItemsChanged = React.useRef(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      indexRef.current = viewableItems[0].index;
    }
  }).current;

  const onChange = (index: number) => {
    flatListRef?.current?.goToPage(index), true;
  };

  const Pagination = () => {
    return (
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => {
            flatListRef?.current.scrollToIndex({index: indexRef.current - 1});
          }}>
          <Icon
            type="feather"
            name="chevron-left"
            size={30}
            color={colors.gray3}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log(indexRef.current, data.length);
            flatListRef?.current.scrollToIndex({index: indexRef.current + 1});
          }}>
          <Icon
            type="feather"
            name="chevron-right"
            size={30}
            color={colors.gray3}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const [showBox, setShowBox] = useState(false);
  return (
    <View style={styles.mainContainer}>
      
      
      <MapView
        onMapReady={() => {
          
          if (Platform.OS === 'android') {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
          }
        }}
        markers={data} 
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}
        coords={location?.coords || null}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  contentContainer: {
    padding: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  result: {
    borderWidth: 1,
    borderColor: '#666',
    width: '100%',
    padding: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
  },
  pagination: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100 + '%',
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  pagingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
});

//make this component available to the app
export default Dealers;
