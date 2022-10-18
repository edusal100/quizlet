import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import AnimatedLottieView from 'lottie-react-native'
import { Colors } from '../constants/colors'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBack} source={require('../assets/mainBackground.png')}>
      <View style={styles.animationContainer}>
            <AnimatedLottieView
              source={require('../assets/loginAnimation.json')} autoPlay loop style={{height:350}}
            />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomMsg}>A Quiz game for all ages</Text>
      <TouchableOpacity onPress={() => navigation.navigate("HomeTab")} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.loginQuestionContainer}>
      <Text style={styles.secondaryText}>Already have an account?</Text>
      <Text style={styles.secondaryTextPurple}>Login</Text>
      </View>
      <StatusBar style='light'/>
      </View>
      </ImageBackground>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    animationContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      width: '100%',
      marginTop: 150
    },
    container: {
      flex:1,
    },
    button: {
      widht: '100%',
      backgroundColor: Colors.main,
      paddingVertical: 18,
      borderRadius: 22,
      alignItems: 'center',
      marginBottom: 15,
      marginTop: 30
    },
    buttonText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#F8F8F9',
    },
    bottomContainer: {
      backgroundColor:"#FFFFFF",
      margin: 10,
      padding: 15,
      borderRadius: 20,
      marginVertical: 15,
    },
    bottomMsg: {
      fontWeight: 'bold',
      fontSize: 22,
      marginHorizontal: 20,
      alignSelf: 'center'
    },
    secondaryText: {
      fontSize: 17,
      color: '#a6a6a6',
      alignSelf: 'center',
      marginEnd: 10,
      fontWeight: '400'
    },
    secondaryTextPurple: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.main,
      alignSelf: 'center'
    },
    imageBack: {
      flex:1
    },
    loginQuestionContainer: {
      flexDirection: 'row',
      alignSelf: 'center'
    },

})