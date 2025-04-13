import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator id={undefined} initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ title: "Registro" }} 
      />
      <Stack.Screen
        name="RecuperarContrasena"
        component={ForgotPasswordScreen}
        options={{ title: "Contraseña" }}
      />
    </Stack.Navigator>
  );
}
