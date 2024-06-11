import {Text} from '@/components';
import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Linking,
  Platform,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import RNMapView, {Circle, Marker} from 'react-native-maps';
import OpenMap from 'react-native-open-maps';
import {Button, Card} from 'react-native-ui-lib';
import SearchBar from '../InvoicePayment/SearchBar';
import {colors} from '@/config';
import Spinner from 'react-native-loading-spinner-overlay';

const MapView = ({coords, markers}: any) => {
  const [loading, setLoading] = React.useState(true);
  const mapRef = useRef<any>(null);
  const [search, setSearch] = React.useState('');
  const [searchData, setSearchData] = React.useState<any>(markers);

  useEffect(() => {
    if (!!coords && mapRef.current) {
      mapRef?.current.animateCamera({
        center: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 16,
      });
    }
  }, [coords]);

  const [selectedMarker, setSelectedMarker] = React.useState<any>(null);

  const RenderUrl = (selectedMarker: any) => {
    const marker = selectedMarker;
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${marker.Latitude},${marker.Longitude}`;
    const label = marker.Name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    return url;
  };

  const searchInApp = (text: string) => {
    const filtered = markers.filter((item: any) => {
      const itemData = item.Address.toLowerCase() + item.Name.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    text.length > 0 ? setSearchData(filtered) : setSearchData(markers);
  };

  useEffect(() => {
    if (markers) {
      setLoading(false);
    }
  }, [markers]);

  return (
    <View style={styles.container}>
      
      <View
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 1,
          left: 0,
          width: Dimensions.get('window').width,
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.8)',
          paddingVertical: 10,
        }}>
        <View style={{width: '90%', marginTop: 10}}>
          <TextInput
            value={search}
            onChangeText={(text: any) => {
              setSearch(text);
              searchInApp(text);
            }}
            autoCapitalize="none"
            placeholder="Bayi adı, il veya ilçe arayın"
            placeholderTextColor="#484848"
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              height: 40,
              borderWidth: 0.5,
              borderColor: 'gray',
              color: '#484848',
            }}
          />
        </View>
        {search && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',

              width: '100%',

              backgroundColor: 'rgba(255,255,255,0.8)',
            }}>
            {search && (
              <View style={{margin: 10, marginTop: 10}}>
                <ScrollView
                  style={{
                    backgroundColor: 'white',
                    height: null,
                    padding: 10,
                    maxHeight: 300,
                    borderRadius: 10,
                    shadowColor: 'black',
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 1.5,
                  }}>
                  {searchData.map((item: any, index: any) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        borderBottomWidth: searchData.length == 1 ? 0 : 0.2,
                        borderColor: colors.gray2,

                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 5,
                        width: '80%',
                      }}
                      onPress={() => {
                        setSelectedMarker(item);
                        mapRef?.current.animateCamera({
                          center: {
                            latitude: item.Latitude,
                            longitude: item.Longitude,
                          },
                          pitch: 0,
                          heading: 0,
                          altitude: 1000,
                          zoom: 16,
                        });
                        setSearch('');
                      }}>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Poppins-Bold',
                            color: '#484848',
                          }}>
                          {item.Name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Poppins-Medium',
                            color: '#484848',
                          }}>
                          {item.Address}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        )}
      </View>
      {!loading && (
        <RNMapView
          ref={mapRef}
          onMapReady={() => {
            console.log('ready');
          }}
          initialCamera={{
            altitude: 15000,
            center: {
              latitude: 40.9568654,
              longitude: 29.1339992,
            },
            heading: 0,
            pitch: 0,
            zoom: 2,
          }}
          initialRegion={{
            latitude: 40.9568654,
            longitude: 29.1339992,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          loadingEnabled
          loadingBackgroundColor="white"
          style={StyleSheet.absoluteFillObject}
          rotateEnabled={false}>
          {!!coords && (
            <>
              <Marker
                anchor={{x: 0.5, y: 0.6}}
                coordinate={{
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                }}
                tracksViewChanges={false}
                flat
                style={{
                  ...(coords.heading !== -1 && {
                    transform: [
                      {
                        rotate: `${coords.heading}deg`,
                      },
                    ],
                  }),
                }}
              />
              {/* <Circle
              center={{
                latitude: coords.latitude,
                longitude: coords.longitude,
              }}
              radius={coords.accuracy}
              strokeColor="rgba(0, 150, 255, 0.5)"
              fillColor="rgba(0, 150, 255, 0.5)"
            /> */}
            </>
          )}
          {markers.map((marker: any, index: any) => {
            const scheme = Platform.select({
              ios: 'maps://0,0?q=',
              android: 'geo:0,0?q=',
            });
            const latLng = `${marker.Latitude},${marker.Longitude}`;
            const label = marker.Name;
            const url = Platform.select({
              ios: `${scheme}${label}@${latLng}`,
              android: `${scheme}${latLng}(${label})`,
            });

            return (
              <Marker
                tracksViewChanges={false}
                style={styles.marker}
                key={index}
                coordinate={{
                  latitude: marker.Latitude,
                  longitude: marker.Longitude,
                }}
                onPress={() => {
                  console.log('marker', marker);
                  setSelectedMarker(marker);
                }}>
                <Image
                  source={require('@/assets/images/2342.png')}
                  style={styles.marker}
                />
              </Marker>
            );
          })}
        </RNMapView>
      )}

      {selectedMarker && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,

            backgroundColor: 'white',
            padding: 10,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              marginHorizontal: 5,

              padding: 10,
              elevation: 5,
            }}>
            <Text size={12} bold>
              {selectedMarker.Name}
            </Text>
            <View style={{marginTop: 5}}>
              <Text size={12} bold>
                {selectedMarker.Address}
              </Text>
            </View>

            <View style={{paddingVertical: 10}}>
              <Button
                onPress={() => {
                  const url = RenderUrl(selectedMarker);
                  Linking.openURL(url);
                }}
                label="Yol Tarifi"
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default MapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'rgb(0, 120, 255)',
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 12,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 4,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgb(0, 120, 255)',
  },
  marker: {
    width: 70,
    height: 70,
  },
});
