import * as ImagePicker from 'expo-image-picker';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect, useState } from 'react';

import {Colors} from '../constants/colors';
import { Feather } from '@expo/vector-icons';
import React from 'react'
import { firebaseConfig } from '../firebase-config'
import { initializeApp } from 'firebase/app'
import { useSelector } from 'react-redux';

const Home = ({navigation}) => {
  const [name, setName] = useState ();
  const [time, setTime] = useState();
  const [greeting, setGreeting] = useState ();
  const [image, setImage] = useState(null);
  const [lastGame,setLastGame] = useState(null);
  const userId = useSelector(state => state.userData.user)
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  
  const getLastGame = async () => {
    if(userId) {
      const querySnapshot = await getDocs(collection(db, 'games'+userId));
      querySnapshot.forEach((doc) => {
        setLastGame(doc.data());
      });}}

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      updateProfile(auth.currentUser, {
        photoURL: result.uri
      })
    }
  };

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const displayName = user.displayName;
      const profilePhoto = user.photoURL;
      setName(displayName)
      profilePhoto && setImage(profilePhoto)
    }
  });

  const getTime = () => {
    let today = new Date();
    let hours = today.getHours()
    setTime(hours)
    hello(time)
  }

  const hello = (time) => {
    if (time < 12) {
      setGreeting("GOOD MORNING")
    } if (time >=12 && time <=17){
      setGreeting("GOOD AFTERNOON")
    } else if(time >=18 && time <=24){
      setGreeting("GOOD NIGHT")
    }
  }

  useEffect(()=>{
    getTime()
    getLastGame()
  }, [time]);
  
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
      <View style={styles.topContainer}>
      <View>
      <View style={styles.greetingdayContainer}>
      {greeting === "GOOD NIGHT" ? <Feather name="moon" size={16} color={Colors.highlight} /> :
      <Feather name="sun" size={16} color={Colors.highlight} />}
      <Text style={styles.greeting}>{greeting}</Text>
      </View>
      <Text style={styles.greetingName}>{name}</Text>
      </View>
      <TouchableOpacity onPress={pickImage}>
      {image ? (<Image source={{uri: image}}
            style={styles.avatar} />) : (
      <Image source={require('../assets/avatar.png')}
            style={styles.avatar} />)}
            </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
        {lastGame&&(
        <View style={styles.recentContainer}>
        <View>
          <Text style={styles.recentQuizText}>RECENT QUIZ</Text>
          <View style={styles.recentDetail}>
            <Feather name="music" size={20} color={'#665058'} />
            <Text style={styles.recentQuizTextDetail}>{lastGame.gameType}</Text>
          </View>
        </View>
        <View style={styles.currentScoreContainer}>
          <Text style={styles.percentage}>65%</Text>
        </View>
        </View>)}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Selector')}>
        <Text>Play</Text>
      </TouchableOpacity>
     </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: Colors.main,
        paddingHorizontal: 25,
        paddingTop: 70
      },
      greeting: {
        color: Colors.highlight,
        fontSize: 14,
        fontWeight: 'bold',
        marginStart: 10,
      },
      greetingdayContainer: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      greetingName: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
        marginTop: 5
      },
      topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      avatar: {
        width: 60,
        height: 60,
        borderRadius: 60
      },
      middleContainer: {
        marginTop: 40
      },
      recentQuizTextDetail: {
        color:'#665058',
        fontWeight: 'bold',
        fontSize: 16,
        marginStart: 10
      },
      recentQuizText: {
        color:'#847279',
        fontWeight: 'bold',
        fontSize: 14,
        marginStart: 10,
        marginBottom: 8
      },
      recentDetail: {
        flexDirection: 'row'
      },
      currentScoreContainer: {
        borderRadius: 60,
        height: 60,
        width: 60,
        backgroundColor: Colors.highlight,
        justifyContent: 'center'
      },
      recentContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.secondary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        justifyContent: 'space-between'
      },
      percentage: {
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16
      },
      cameraContainer: {
        flex: 1,
    }
      
})