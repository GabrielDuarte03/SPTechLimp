import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import Home from './src/screens/Home';
import Login from './src/screens/Login';

const Stack = createStackNavigator();
export default function App() {
   return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" options={{headerShown: false}} component={SplashScreen}/>
        <Stack.Screen name="Home" options={{headerShown: false}} component={Home}/>
        <Stack.Screen name="Login" options={{headerShown: false}} component={Login}/>
      </Stack.Navigator>
    </NavigationContainer>
  
  );
  


}