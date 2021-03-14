import * as Font from "expo-font"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import Settings from "./Settings";
import Gamescreen from './Gamescreen';
import MainMenu from './MainMenu';
const Stack = createStackNavigator()
export default function App() {
  const [ isReady, setIsReady ] = useState(false);
  async function loadApplication() {
    await Font.loadAsync({
      "Recursive_Casual-Medium": require("./assets/fonts/Recursive_Casual-Medium.ttf"),
      "Recursive-Light": require("./assets/fonts/Recursive-Light.ttf")
    })
  }
  if(!isReady) {
    return <AppLoading startAsync={ loadApplication } onError={err => console.log(err)} onFinish={() => setIsReady(true)} />
  }
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
