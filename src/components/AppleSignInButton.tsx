// AppleSignInButton.tsx
import React from 'react';
import { Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import appleAuth, { AppleButton } from "@invertase/react-native-apple-authentication";

interface AppleSignInButtonProps {
  onPress: () => void;
  style?: any;
}

const AppleSignInButton: React.FC<AppleSignInButtonProps> = ({ onPress, style }) => {
  if (Platform.OS === 'ios' && appleAuth.isSupported) {
    return (
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={style}
        onPress={onPress}
      />
    );
  }
  return null; // No renderiza nada en otras plataformas
  // O podrías renderizar un placeholder:
  // return (
  //   <TouchableOpacity style={[style, styles.placeholderButton]} onPress={onPress} disabled>
  //     <Text style={styles.placeholderText}>Iniciar sesión con Apple (solo iOS)</Text>
  //   </TouchableOpacity>
  // );
};

const styles = StyleSheet.create({
  placeholderButton: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
  },
});

export default AppleSignInButton;