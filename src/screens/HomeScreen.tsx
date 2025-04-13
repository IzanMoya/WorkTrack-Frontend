import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import * as Location from 'expo-location';

let MapView, Marker;
const isWeb = Platform.OS === 'web';

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Para obtener la ubicación en tiempo real (opcional)
      if (!isWeb) {
        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (updatedLocation) => {
            setLocation(updatedLocation);
          }
        );
      }
    })();
  }, [isWeb]);

  useEffect(() => {
    if (!isWeb) {
      const ReactNativeMaps = require('react-native-maps');
      MapView = ReactNativeMaps.default;
      Marker = ReactNativeMaps.Marker;
    }
  }, [isWeb]);

  let text = 'Cargando ubicación...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`;
  }

  if (isWeb) {
    return (
      <View style={styles.container}>
        <Text>La funcionalidad de mapa no está disponible en la web.</Text>
        {location && <Text>{text}</Text>}
        {errorMsg && <Text>{errorMsg}</Text>}
        {!location && !errorMsg && <Text>Cargando ubicación (solo visible en nativo)...</Text>}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location && MapView ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation={true}
        >
          {/* Puedes agregar un marcador en la ubicación actual si lo deseas */}
          {/* <Marker
            coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
            title="Mi ubicación"
            description={text}
          /> */}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>{text}</Text>
        </View>
      )}
      {/* Puedes agregar aquí otros elementos de la interfaz de usuario */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;