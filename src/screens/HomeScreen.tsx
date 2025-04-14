import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import * as Location from 'expo-location';

let MapViewComponent = null;
let MarkerComponent = null;

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [statusFichaje, setStatusFichaje] = useState('Pendiente');
  const [horaEntrada, setHoraEntrada] = useState(null);
  const [isNative, setIsNative] = useState(Platform.OS !== 'web');

  useEffect(() => {
    if (isNative) {
      import('react-native-maps')
        .then((module) => {
          MapViewComponent = module.default;
          MarkerComponent = module.Marker;
        })
        .catch((error) => {
          console.error('Error al cargar react-native-maps:', error);
        });
    }
  }, [isNative]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso de ubicación denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const handleFichar = () => {
    setStatusFichaje('Hecho');
    const now = new Date();
    const hora = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setHoraEntrada(hora);
  };

  return (
    <View style={styles.container}>
      {location && isNative && MapViewComponent && MarkerComponent ? (
        <MapViewComponent
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <MarkerComponent coordinate={location} title="Tu ubicación" />
        </MapViewComponent>
      ) : (
        <View style={styles.mapPlaceholder}>
          <Text>Mapa no disponible en la web</Text>
          {/* Aquí podrías renderizar un componente de mapa web alternativo si lo deseas */}
        </View>
      )}

      <View style={styles.infoContainer}>
        <Button title="Fichar Salida" onPress={handleFichar} color="#000" />

        <View style={styles.statusContainer}>
          <Text style={styles.estadoLabel}>Estado Actual Fichaje:</Text>
          <Text style={{ color: statusFichaje === 'Pendiente' ? 'red' : 'green' }}>
            {statusFichaje}
          </Text>
          {horaEntrada && (
            <Text style={styles.hora}>Entrada registrada a las {horaEntrada}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 3,
  },
  mapPlaceholder: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  infoContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  statusContainer: {
    marginTop: 20,
  },
  estadoLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  hora: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
});