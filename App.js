import MyStack from './navigation'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux';
import React from 'react'
import { StyleSheet } from 'react-native'
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack/>
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({

})