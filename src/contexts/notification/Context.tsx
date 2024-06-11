import {Text} from '@/components';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import {ActivityIndicator, Dimensions, View} from 'react-native';
//@ts-ignore
import {SkypeIndicator, DotIndicator} from 'react-native-indicators';
import {
  Notifier,
  NotifierComponents,
  NotifierRoot,
} from 'react-native-notifier';
export type NotificationState = {
  type?: string;
  setType?: any;
  setNotification: any;
  message?: Object;
  setMessage?: any;
  handleNotification?: any;
};

const initialState: NotificationState = {
  type: undefined,
  setNotification: null,
  message: undefined,
  setMessage: undefined,
  handleNotification: undefined,
};

export const NotificationContext =
  createContext<NotificationState>(initialState);

export const NotificationProvider = ({children}: any) => {
  const [type, setType] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<Object | any>(undefined);
  const [notification, setNotification] = useState<boolean | any>(null);
  const notifierRef = useRef(null);

  const handleNotification = ({type, message}: any) => {
    Notifier.showNotification({
      title: type === 'error' ? 'Hata' : 'Başarılı',

      description: message,
      Component: NotifierComponents.Notification,
      componentProps: {
        titleStyle: {
          fontFamily: 'Poppins-Bold',
          fontWeight: '600',
          fontSize: 13,
        },
        descriptionStyle: {
          fontFamily: 'Poppins-Regular',
          fontSize: 12,
        },
        imageSource:
          type === 'error'
            ? require('@/assets/png-icon/error.png')
            : require('@/assets/png-icon/check.png'),
      },
    });
    
  };

  return (
    <NotificationContext.Provider
      value={{
        handleNotification,
      }}>
      <NotifierRoot ref={notifierRef} />
      {children}
    </NotificationContext.Provider>
  );
};
export const useNotification = () => useContext(NotificationContext);

// Path: src/contexts/auth/Context.tsx
