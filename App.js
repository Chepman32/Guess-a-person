import * as Font from "expo-font"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import AppLoading from 'expo-app-loading';
import React from 'react';
import Settings from "./Settings";
import Gamescreen from './Gamescreen';
import MainMenu from './MainMenu';
import { DB } from "./db";
const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu" options={{
        headerShown: false
      }} >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
       name="Gamescreen" 
       component={Gamescreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerBackImage: () => {},
        gestureEnabled: false,
      }} />
      <Stack.Screen name="MainMenu" component={MainMenu} options={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerBackImage: () => {},
        gestureEnabled: false,
      }} />
      
    </Stack.Navigator>
    </NavigationContainer>
  );
}
