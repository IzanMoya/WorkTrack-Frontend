import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import MainNavigator from './navigation/MainNavigator';
import AuthNavigator from './navigation/AuthNavigator';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from '../src/screens/RegisterScreen';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Configurar Google SignIn una sola vez al iniciar la app
    GoogleSignin.configure({
      webClientId: "439763098158-mj2r9pn0e7gbkfeqco0f3h8iemhd5t40.apps.googleusercontent.com",
    });

    // Escuchar cambios de sesión
    const unsubscribe = auth().onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
