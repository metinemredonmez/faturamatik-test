import React from 'react';
import {View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExplorePage from './Explore';
import ExploreDetail from './ExploreDetail';

const ExploreNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
      <Stack.Screen name="ExplorePage" component={ExplorePage} />
      <Stack.Screen name="ExploreDetail" component={ExploreDetail} />
    </Stack.Navigator>
  );
};

export default ExploreNavigation;