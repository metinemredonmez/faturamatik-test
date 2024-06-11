import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useContext, useEffect} from 'react';
import {Animated, View} from 'react-native';
import {
  Notifier,
  NotifierComponents,
  NotifierRoot,
  Easing,
} from 'react-native-notifier';
import {Toast} from 'react-native-ui-lib';

export type AuthState = {
  user: any;
  setUser: any;
  isLogin: boolean;
  setIsLogin: any;
  token: any;
  setToken: any;
  isIntro: boolean;
  setIsIntro: any;
  id: any;
  password: any;
  setId: any;
  setPassword: any;
  logout: any;
  authError: any;
  setAuthError: any;
};

const initialState: AuthState = {
  user: null,
  setUser: null,
  isLogin: false,
  setIsLogin: null,
  token: null,
  setToken: null,
  isIntro: false,
  setIsIntro: null,
  id: null,
  password: null,
  setId: null,
  setPassword: null,
  logout: null,
  authError: null,
  setAuthError: null,
};

export const AuthContext = createContext<AuthState>(initialState);

export const AuthProvider = ({children}: any) => {
  const [showError, setShowError] = useState<boolean>(false);

  const [user, setUser] = useState<any>(null);

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const [token, setToken] = useState<any>(null);

  const [isIntro, setIsIntro] = useState<boolean>(false);

  const [id, setId] = useState<any>(null);

  const [password, setPassword] = useState<any>(null);

  const [authError, setAuthError] = useState<boolean>(false);

  const fetchUser = async () => {
    const user = await AsyncStorage.getItem('user');
    const token = await AsyncStorage.getItem('token');

    if (user && token) {
      console.log('user', user);
      setUser(JSON.parse(user));
      setToken(token);
      setIsLogin(true);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('id');
    await AsyncStorage.removeItem('password');
    setIsLogin(false);
    setUser(null);
    setToken(null);
    setId(null);
    setPassword(null);
  };

  const checkEndIntro = async () => {
    const isIntro = await AsyncStorage.getItem('isIntro');
    if (isIntro) {
      setIsIntro(true);
    }
  };

 



  React.useEffect(() => {
    checkEndIntro();
    fetchUser();
  }, []);

  const ref = React.useRef<any>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLogin,
        setIsLogin,
        token,
        setToken,
        isIntro,
        setIsIntro,
        id,
        setId,
        password,
        setPassword,
        logout,
        authError,
        setAuthError,
      }}>
      

      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

// Path: src/contexts/auth/Context.tsx
