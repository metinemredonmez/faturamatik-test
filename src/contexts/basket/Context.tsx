import { Text } from '@/components';
import React, {createContext, useState, useContext} from 'react';
import {ActivityIndicator, Dimensions, View} from 'react-native';
//@ts-ignore
import {SkypeIndicator,DotIndicator} from 'react-native-indicators';
export type BasketState = {
  basket: any;
  setBasket: any;
};

const initialState: BasketState = {
  basket: false,
  setBasket: null,
};

export const BasketContext = createContext<BasketState>(initialState);

export const BasketProvider = ({children}: any) => {
  const [basket, setBasket] = useState<any>(0);

  return (
    <BasketContext.Provider
      value={{
        basket,
        setBasket,
      }}>
     
      {children}
    </BasketContext.Provider>
  );
};
export const useBasket = () => useContext(BasketContext);

// Path: src/contexts/auth/Context.tsx
