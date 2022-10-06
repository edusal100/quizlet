import Discover from '../screens/discover';
import { Feather } from '@expo/vector-icons';
import Home from '../screens/home';
import Profile from '../screens/profile';
import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
      <Tab.Navigator    
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: { position: 'absolute', borderRadius: 15, height: 60},
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'search' : 'search';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#d3d3d3'
      })}
      >
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Discover' component={Discover}/>
        <Tab.Screen name='Profile' component={Profile}/>
      </Tab.Navigator>
  )
}

export default HomeTab

const styles = StyleSheet.create({})