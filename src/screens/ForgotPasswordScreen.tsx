import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleRecuperarContrasena = () => {
    // Aquí iría la lógica para enviar el correo de recuperación de contraseña
    console.log('Solicitud de recuperación para el email:', email);
    // Puedes agregar aquí la navegación a otra pantalla o mostrar un mensaje
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Contraseña</Text>
      <Text style={styles.subtitle}>Por favor, introduce tu email para recuperar la contraseña</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Tu email"
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleRecuperarContrasena}>
        <Text style={styles.buttonText}>Recuperar contraseña</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start', // Para alinear los elementos desde la parte superior
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50, // Ajusta según sea necesario para el espaciado superior
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000', // Color negro como en la imagen
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;