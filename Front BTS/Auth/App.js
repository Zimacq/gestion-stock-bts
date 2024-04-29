import React from 'react';
import AppNavigator from './AppNavigateur'; // Assurez-vous que le chemin est correct
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
