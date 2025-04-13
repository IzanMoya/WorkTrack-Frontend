import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Text } from 'react-native'; // Asegúrate de tener esta importación

export default function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Aquí iría tu lógica real para verificar si el usuario ha iniciado sesión.
    // Este es un ejemplo simulado con un timeout.
    // Reemplaza esto con tu sistema de autenticación real.

    // Ejemplo con Firebase Auth:
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // !!user convierte el objeto user en un booleano (true si existe, false si no)
      setIsLoading(false);
    });

    // Limpia el listener cuando el componente se desmonta
    return () => unsubscribe();

    // Ejemplo simulado (eliminar cuando uses autenticación real):
    // setTimeout(() => {
    //   // Simula una verificación de autenticación
    //   const userLoggedIn = false; // Cambia a true para simular un usuario logueado
    //   setIsAuthenticated(userLoggedIn);
    //   setIsLoading(false);
    // }, 2000);
  }, []);

  if (isLoading) {
    // Puedes mostrar una pantalla de carga aquí
    return <Text>Cargando...</Text>;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}