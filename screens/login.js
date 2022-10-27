import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import AnimatedLottieView from 'lottie-react-native'
import { Colors } from '../constants/colors'
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { openDatabase } from 'expo-sqlite';

const db = openDatabase('mainDB')


const Login = ({navigation}) => {

  const [signUp, setSignUp] = useState(true);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const changeScreen = () => {
    setSignUp(current => !current)
  }

  useEffect(()=>{
    createTable();
    getData();
  }, [])

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Users (Name TEXT NOT NULL, Email TEXT NOT NULL, Password INTEGER NOT NULL);'
      )
      console.log('table created')
    })
  }

  const getData = () => {
    try{
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT Email, Name, Password FROM Users',
          [],
        )})
      } catch (error){
        console.log(error)
      }
  }

  const setData = async () => {
    if(email.lenght == 0 || password.lenght == 0 || name.lenght == 0) {
      Alert.alert('Please enter all information')
    } else {
    try{
       db.transaction(async (tx) => {
       tx.executeSql(
          'INSERT INTO Users (Email, Name, Password) VALUES (?,?,?)',
          [email, name, password],
          navigation.navigate("HomeTab")
        )})
      } catch (error){
        console.log(error)
      }
  }}


  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBack} source={require('../assets/mainBackground.png')}>
      <View style={styles.animationContainer}>
            <AnimatedLottieView
              source={require('../assets/loginAnimation.json')} autoPlay loop style={{height:350}}
            />
      </View>
     {signUp ? (
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomMsg}>Sign up</Text>
        <View style={{flexDirection:'row', alignItems: 'center', marginBottom:20, marginStart: 5}}>
        <Feather name='at-sign' size={24} color={Colors.gray} />
        <TextInput 
        style={styles.input}
        placeholder="Email"
        onChangeText={(value) => setEmail(value)}
        />
        </View>
        <View style={{flexDirection:'row', alignItems: 'center', marginBottom:20, marginStart: 5}}>
        <Feather name='user' size={24} color={Colors.gray} />
        <TextInput 
        style={styles.input}
        placeholder="Full name"
        onChangeText={(value) => setName(value)}
        />
        </View>
        <View style={{flexDirection:'row', alignItems: 'center', marginBottom:20, marginStart: 5}}>
        <Feather name='lock' size={24} color={Colors.gray} />
        <TextInput 
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
        />
        </View>
        <Text style={styles.secondaryText}>By signing up, you agree to our Terms and conditions and Privacy Policy.</Text>
      <TouchableOpacity style={styles.button} onPress={setData}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.loginQuestionContainer}>
      <Text style={styles.secondaryText}>Joined us before?</Text>
      <TouchableOpacity onPress={changeScreen}>
      <Text style={styles.secondaryTextPurple}>Login</Text>
      </TouchableOpacity>
      </View>
      </View>) : (
        <View style={styles.bottomContainer}>
        <Text style={styles.bottomMsg}>Login</Text>
        <View style={{flexDirection:'row', alignItems: 'center', marginBottom:20, marginStart: 5}}>
        <Feather name='at-sign' size={24} color={Colors.gray} />
        <TextInput 
        style={styles.input}
        placeholder="Email"
        onChangeText={(value) => setEmail(value)}
        />
        </View>
        <View style={{flexDirection:'row', alignItems: 'center', marginBottom:20, marginStart: 5}}>
        <Feather name='lock' size={24} color={Colors.gray} />
        <TextInput 
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
        />
        </View>
        <Text style={{color: Colors.main, fontWeight: 'bold', alignSelf: 'flex-end', marginEnd:15, fontSize: 15}}>Forgot Password?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("HomeTab")} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.loginQuestionContainer}>
      <Text style={styles.secondaryText}>Dont have an account?</Text>
      <TouchableOpacity onPress={changeScreen}>
      <Text style={styles.secondaryTextPurple}
      >Sign Up</Text>
      </TouchableOpacity>
      </View>
      </View>

      )} 
            
      <StatusBar style='light'/>
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
      marginTop: 50
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
      marginTop: 30,
      marginBottom: 30
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
      fontSize: 35,
      marginHorizontal: 5,
      alignSelf: 'flex-start',
      marginBottom: 40
    },
    secondaryText: {
      fontSize: 17,
      color: '#a6a6a6',
      alignSelf: 'center',
      fontWeight: '400'
    },
    secondaryTextPurple: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.main,
      alignSelf: 'center',
      marginStart: 10
    },
    imageBack: {
      flex:1
    },
    loginQuestionContainer: {
      flexDirection: 'row',
      alignSelf: 'center'
    },
    input: {
      height: 40,
      marginStart: 15,
      borderBottomWidth: 0.6,
      borderColor:Colors.gray,
      width: '83%',
      fontSize: 17,
      fontWeight: '500',
    },

})