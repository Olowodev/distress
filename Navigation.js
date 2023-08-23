import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import Home from './screens/Home';
import Intro from './screens/Intro';
import { Toast } from 'react-native-toast-message/lib/src/Toast';


const Stack = createStackNavigator();

export default function Navigation() {
  const user = useSelector((state) => state.user);
    console.log(user, 'navigation')
  return (
    <NavigationContainer>
      {user || user !== null ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
            <Stack.Screen name='Intro' component={Intro} options={{headerShown: false}} />
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      )}
      <Toast />
    </NavigationContainer>
  );
}