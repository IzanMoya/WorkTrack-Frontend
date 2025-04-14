// __mocks__/react-native-maps/index.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapView = (props) => (
  <View style={[styles.container, props.style]}>
    <Text style={styles.text}>Mapa no disponible en la web</Text>
  </View>
);

const Marker = () => null;

module.exports = {
  MapView,
  Marker,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    color: '#999',
    fontSize: 16,
  },
});