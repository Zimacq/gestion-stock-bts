import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, StatusBar, Alert, Modal } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isForgotPasswordPopupVisible, setForgotPasswordPopupVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try { 
      setError('');
      const auth = getAuth(app);
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Stock'); // Naviguez vers l'écran d'accueil après la connexion réussie
    } catch (error) {
      setError('Échec de la connexion. Vérifiez vos identifiants.');
      Alert.alert('Erreur', 'Échec de la connexion. Vérifiez vos identifiants.');
    }
  };

  const showForgotPasswordPopup = () => {
    setForgotPasswordPopupVisible(true);
  };

  const hideForgotPasswordPopup = () => {
    setForgotPasswordPopupVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.fullScreen}
    >
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.fullScreen}
      >
        <View style={styles.card}>
          {/* */}
          <Image
            source={require('../img/avater.png')}
            style={styles.avatar}
          />
          <Text style={styles.title}>BIENVENUE</Text>
          <TextInput
            placeholder="Adresse e-mail"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Mot de passe"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>CONNEXION</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showForgotPasswordPopup}>
            <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isForgotPasswordPopupVisible}
        onRequestClose={hideForgotPasswordPopup}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text>
            Veuillez contacter le support pour mettre à jour votre mot de passe.{"\n"}
             Support : <Text style={styles.supportLink}>SupportMasterMind@GOAT.com</Text>
          </Text>
            <TouchableOpacity onPress={hideForgotPasswordPopup}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  card: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
      marginBottom: 20,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    // S'assurer que la carte est centrée sur tous les appareils
    marginTop: '30%',
    marginLeft: '10%',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#34A853',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  forgotPassword: {
    color: '#1E90FF',
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  closeButtonText: {
    marginTop: 10,
    color: '#1E90FF',
  },

  supportLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    
  },
});

export default LoginScreen;