import { auth } from "../config/firebase";

export const getFirebaseToken = async (): Promise<string | null> => {
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken(); // Token válido por 1h aprox.
    }
    return null;
  };
  