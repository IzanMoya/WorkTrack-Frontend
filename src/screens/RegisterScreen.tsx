import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { register} from '../services/authService';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await register(email, password);
      navigation.goBack(); // volver al Login para iniciar sesión
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View>
      <Text>Registro</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Contraseña" secureTextEntry onChangeText={setPassword} />
      <Button title="Registrar" onPress={handleRegister} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default RegisterScreen;
