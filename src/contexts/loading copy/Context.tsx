import { Text } from '@/components';
import React, {createContext, useState, useContext} from 'react';
import {ActivityIndicator, Dimensions, View} from 'react-native';
//@ts-ignore
import {SkypeIndicator,DotIndicator} from 'react-native-indicators';
export type LoadingState = {
  loading: boolean;
  setLoading: any;
};

const initialState: LoadingState = {
  loading: false,
  setLoading: null,
};

export const LoadingContext = createContext<LoadingState>(initialState);

export const LoadingProvider = ({children}: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
          zIndex: 99999,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: loading ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flex:1
        }}>
        
        
        <SkypeIndicator color="white" />
      </View>
      {children}
    </LoadingContext.Provider>
  );
};
export const useLoading = () => useContext(LoadingContext);

// Path: src/contexts/auth/Context.tsx
