import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';

//Configuración de Google Sing-in
GoogleSignin.configure({
    webClientId: "439763098158:web:0fc81e744f4932ec6cddbf"
})


//Inciar Sesión con Google
export const signInWithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    } catch (error) {
        console.error("Error en Google Sign-In:", error);
        throw error;
    }
};

// Iniciar sesión con Apple
export const signInWithApple = async () => {
    try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        if (!appleAuthRequestResponse.identityToken) {
            throw new Error("No se obtuvo un token de identidad");
        }

        const appleCredential = auth.AppleAuthProvider.credential(
            appleAuthRequestResponse.identityToken
        );

        return auth().signInWithCredential(appleCredential);
    } catch (error) {
        console.error("Error en Apple Sign-In:", error);
        throw error;
    }
};


//Registro de los usuarios
export const signUp = async (email: string, password: string) => {
    try{
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        return userCredential.user;
    }catch (error) {
        console.error("Error en el registro: ",error)
        throw error;
    }
};

//Iniciar sesión
export const signIn = async (email: string, password: string) => {
    try{
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        return userCredential.user
    }catch (error) {
        console.error("Error en inicio de sesion: ",error)
        throw error;
    }
};

//Cerrar Sesión
export const signOut = async () => {
    try{
        await auth().signOut();
    }catch (error) {
        console.error("Error al cerrar sesión:",error);
        throw error;
    }
};

//Restablecer Constraseña
export const resetPassword = async (email: string) => {
    try {
        await auth().sendPasswordResetEmail(email);
    }catch(error) {
        console.error("Error al enviar email de recuperación:",error)
        throw error;
    }
}