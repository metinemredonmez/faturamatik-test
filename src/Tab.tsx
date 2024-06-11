//import liraries
import React, {Component, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomBar from './components/BottomBar/BottomBar';
import HomePage from './screens/Home/Home';
import FaturamatikPage from './screens/Faturamatik/Faturamatik';
import OtherActionPage from './screens/OtherAction/OtherAction';
import NotificationPage from './screens/Notifications/Notification';
import TransactionPage from './screens/Transcation/Transaction';
import ShoppingCartPage from './screens/ShoppingCart/ShoppingCart';
import ExplorePage from './screens/Explore/Explore';
import ProfilePage from './screens/Profile/Profile';
import HomeNavigation from './screens/Home';
import {
  StackNavigationState,
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import {useSafeArea} from 'react-native-safe-area-context';
import ShoppingCartNavigation from './screens/ShoppingCart';
import {useAuth} from './contexts/auth/Context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import TransactionNavigation from './screens/Transcation';
import ProfileNavigation from './screens/Profile';
import {Host} from 'react-native-portalize';
import ExploreNavigation from './screens/Explore';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors } from './config';
// create a component
const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  const auth = useAuth();
  const navigation = useNavigation();

  // useEffect(() => {
  //   if(!auth?.token) {
  //     navigation.navigate('LoginScreen')
  //   }
  // }, [auth?.token])

  return (
    
      <View style={{flex: 1}}>
        <StatusBar hidden={Platform.OS === 'android'} />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
          tabBar={props => <BottomBar {...props} />}>
          <Tab.Screen
            name="Home"
            options={({route}) => ({
              tabBarLabel: 'Anasayfa',
            })}
            component={HomeNavigation}
          />

          <Tab.Screen
            name="Transaction"
            options={{
              tabBarLabel: 'Hareketler',
            }}
            component={TransactionNavigation}
          />
          <Tab.Screen
            name="ShoppingCartPage"
            options={{
              tabBarLabel: 'Sepetim',
            }}
            component={ShoppingCartNavigation}
          />
          <Tab.Screen
            name="Explore"
            options={{
              tabBarLabel: 'Keşfet',
            }}
            component={ExploreNavigation}
          />
          <Tab.Screen
            name="Profile"
            options={{
              tabBarLabel: 'Ayarlar',
            }}
            component={ProfileNavigation}
          />
        </Tab.Navigator>
        {useSafeArea().bottom > 0 && (
          <View
            style={{
              height: useSafeArea().bottom - 20,
              backgroundColor: 'white',
            }}
          />
        )}
      </View>
    
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default TabNavigation;
