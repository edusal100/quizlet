import { StyleSheet, View } from 'react-native'

import MyStack from './navigation'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

const App = () => {
  return (
      <NavigationContainer>
        <MyStack/>
      </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({

})