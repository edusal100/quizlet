import Home from '../screens/home';
import Quiz from '../screens/quiz';
import React from 'react';
import Result from '../screens/result';
import Selector from '../screens/selector';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function MyStack() {
    
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
      <Stack.Screen name="Quiz" component={Quiz} options={{headerShown:false}}/>
      <Stack.Screen name="Result" component={Result} options={{headerShown:false}}/>
      <Stack.Screen name="Selector" component={Selector} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default MyStack;