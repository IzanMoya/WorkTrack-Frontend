import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { signIn, signInWithGoogle, signInWithApple  } from "../services/authService";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import appleAuth  from "@invertase/react-native-apple-authentication";
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

    return (
        <View>
            <Text>Iniciar Sesión</Text>
            <TextInput placeholder="Email" onChangeText={setEmail} />
            <TextInput placeholder="Contraseña" secureTextEntry onChangeText={setPassword} />
            <Button title="Ingresar" onPress={handleLogin} />
            {error ? <Text>{error}</Text> : null}

            {/* Botón de Google */}
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={handleGoogleLogin}
            />

            {/* Botón de Apple (solo en iOS) */}
            {appleAuth.isSupported && (
                <appleAuth.AppleButton
                    buttonStyle={appleAuth.AppleButton.Style.BLACK}
                    buttonType={appleAuth.AppleButton.Type.SIGN_IN}
                    onPress={handleAppleLogin}
                />
            )}
        </View>
    );
};

export default LoginScreen;
