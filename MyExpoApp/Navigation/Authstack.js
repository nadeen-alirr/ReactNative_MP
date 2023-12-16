import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import SplashScreen from "../screens/SplashScreen";
import Introudoction1 from '../screens/Introudoction1';
import Introduction2 from '../screens/Introduction2';
import Introuduction3 from '../screens/Introuduction3';
import { AuthContext } from "../context/Authcontext";

const Stack = createStackNavigator();

const Authstack = () => {

  return (
    <Stack.Navigator initialRouteName="Splash Screen">
      <Stack.Screen name="Splash Screen" component={Login} />
      <Stack.Screen name="introduction" component={Introudoction1} />
      <Stack.Screen name="introduction2" component={Introduction2} />
      <Stack.Screen name="introduction3" component={Introuduction3} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

export default Authstack