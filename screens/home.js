import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React from 'react'
import { StatusBar } from 'expo-status-bar'

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBack} source={require('../assets/blue.jpeg')}>
      
      <View style={styles.bannerContainer}>
            <Image source={require('../assets/mainLogo.png')}
            style={styles.banner} resizeMode='contain'/>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomMsg}>A QUIZ GAME FOR ALL AGES</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Selector")} style={styles.button}>
        <Text style={styles.buttonText}>LET'S PLAY</Text>
      </TouchableOpacity>
      <Text style={styles.secondaryText}>By continuing you agree to have a damn fun</Text>
      <StatusBar style='light'/>
      </View>
      </ImageBackground>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    banner: {
        height: 400,
        width: 400
    },
    bannerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    container: {
      flex:1,
    },
    button: {
      widht: '100%',
      backgroundColor: '#648DE5',
      padding: 16,
      borderRadius: 22,
      alignItems: 'center',
      marginBottom: 15,
      marginTop: 30
    },
    buttonText: {
      fontSize: 24,
      fontWeight: '600',
      color: '#F8F8F9',
    },
    bottomContainer: {
      backgroundColor:"#F8F8F9",
      margin: 10,
      padding: 15,
      borderRadius: 20,
      marginVertical: 15,
    },
    bottomMsg: {
      fontWeight: 'bold',
      fontSize: 20,
      marginHorizontal: 20,
      alignSelf: 'center'
    },
    secondaryText: {
      fontSize: 15,
      color: '#a6a6a6',
      alignSelf: 'center'
    },
    logo: {
      height: 40,
        width: 400
    },
    imageBack: {
      flex:1
    }

})