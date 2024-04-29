import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen'; // Assurez-vous que le chemin est correct
import ProductScreen from './Screens/StockScreen'; // Assurez-vous que le chemin est correct

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Stock" component={ProductScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
