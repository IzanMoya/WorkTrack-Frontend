import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen'; // Asegúrate de la ruta correcta

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator id={undefined} initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* Aquí puedes agregar otras pantallas de la aplicación principal */}
    </Stack.Navigator>
  );
}