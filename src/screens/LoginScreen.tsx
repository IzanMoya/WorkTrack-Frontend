import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { signIn, signInWithGoogle, signInWithApple } from "../services/authService";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import appleAuth, { AppleButton } from "@invertase/react-native-apple-authentication";


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            await signIn(email, password);
            navigation.navigate("HomeScreen");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
            navigation.navigate("HomeScreen");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAppleLogin = async () => {
        try {
            await signInWithApple();
            navigation.navigate("HomeScreen");
        } catch (err) {
            setError(err.message);
        }
    };

    const navigateToForgotPassword = () => {
        navigation.navigate("RecuperarContrasena"); // Asegúrate de que "RecuperarContrasena" sea el nombre de tu ruta
    };

    return (
        <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.innerContainer}
        >
          <Text style={styles.title}>¡Bienvenido!</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#999"
            secureTextEntry
            style={styles.input}
            onChangeText={setPassword}
            value={password}
          />

          <TouchableOpacity onPress={navigateToForgotPassword}>
            <Text style={styles.forgotText}>¿Contraseña olvidada?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <GoogleSigninButton
            style={styles.googleButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleLogin}
          />

          {appleAuth.isSupported && (
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={styles.appleButton}
              onPress={handleAppleLogin}
            />
          )}

          <Text style={styles.registerText}>
            ¿No tienes cuenta?{" "}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate("Register")}
            >
              Regístrate
            </Text>
          </Text>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    innerContainer: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 40,
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      paddingVertical: 10,
      marginBottom: 20,
      fontSize: 16,
    },
    forgotText: {
      textAlign: "right",
      color: "#aaa",
      marginBottom: 30,
    },
    loginButton: {
      backgroundColor: "#000",
      borderRadius: 25,
      paddingVertical: 15,
      alignItems: "center",
      marginBottom: 20,
    },
    loginButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    googleButton: {
      width: "100%",
      height: 48,
      marginVertical: 10,
    },
    appleButton: {
      width: "100%",
      height: 48,
      marginBottom: 20,
    },
    registerText: {
      textAlign: "center",
      marginTop: 20,
      color: "#999",
    },
    registerLink: {
      color: "#000",
      fontWeight: "bold",
    },
    errorText: {
      color: "red",
      marginTop: 10,
      textAlign: "center",
    },
  });

export default LoginScreen;