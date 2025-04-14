import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const getFirebaseToken = async () => {
    const user = auth().currentUser;
    if(user) {
        return await user.getIdToken();
    }
    return null;
};

//Configuración de Google Sing-in
GoogleSignin.configure({
    webClientId: "439763098158:web:0fc81e744f4932ec6cddbf"
})

//Registrarse
export const register = async (email: string, password: string) => {
    const userCredential = await auth().createUserWithEmailAndPassword(email,password);
    return userCredential.user;
}

//Inciar Sesión con Google
export const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      
      // Primero inicia sesión
      const userInfo = await GoogleSignin.signIn();
  
      // Luego obtén el token de autenticación
      const { idToken } = await GoogleSignin.getTokens();
  
      // Crea credencial para Firebase
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
      // Inicia sesión en Firebase
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error("Error en Google Sign-In:", error);
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