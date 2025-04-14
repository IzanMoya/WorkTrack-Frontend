import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Story, Meta } from '@storybook/react-native';

import HomeScreen from './HomeScreen'; // Importa tu componente HomeScreen

export default {
  title: 'Screens/HomeScreen', // Define la categoría y el nombre de la historia en Storybook
  component: HomeScreen,
} as Meta;

const styles = StyleSheet.create({
  mapPlaceholder: {
    flex: 1, // O ajusta la proporción según tu diseño
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 20,
  },
  nativeComponentPlaceholder: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
  },
});

// Decorator para simular la ausencia de componentes nativos en la web
const withWebPlaceholders = (Story) => (
  <View style={{ flex: 1 }}>
    {/* Reemplaza cualquier componente nativo específico con un placeholder */}
    {/* Ejemplo para react-native-maps */}
    <View style={styles.mapPlaceholder}>
      <Text style={styles.text}>Mapa no disponible en la web (Storybook)</Text>
    </View>
    <ScrollView style={styles.container}>
      <Story />
    </ScrollView>
  </View>
);

export const Default = () => <HomeScreen />;

export const WebView = () => (
  <View style={{ flex: 1 }}>
    {/* Reemplaza el mapa real con un placeholder */}
    <View style={styles.mapPlaceholder}>
      <Text style={styles.text}>Mapa no disponible en la web (Storybook)</Text>
    </View>
    <ScrollView style={styles.container}>
      {/* Renderiza los otros elementos visuales de tu HomeScreen */}
      <Text style={styles.text}>Estado Actual Fichaje: Pendiente (Simulado)</Text>
      <View style={styles.nativeComponentPlaceholder}>
        <Text style={styles.text}>Botón de Fichar Salida (Simulado)</Text>
      </View>
      {/* ... simula o renderiza los otros elementos de tu HomeScreen */}
    </ScrollView>
  </View>
);

WebView.decorators = [withWebPlaceholders];