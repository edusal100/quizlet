import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';

import { Camera } from 'expo-camera'
import {Colors} from '../constants/colors';
import { Feather } from '@expo/vector-icons';
import React from 'react'

const Home = ({navigation}) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [startCamera, setStartCamera] = useState (false);
  const [name, setName] = useState ();
  const [time, setTime] = useState();
  const [greeting, setGreeting] = useState ();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const displayName = user.displayName;
      setName(displayName)
    } else {
    }
  });

  const _startCamera = async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted')
    setStartCamera(true)
  }

  const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null)
        setImage(data.uri);
    }
  }

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
  }, [time]);

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>
  }
  
  return (
    <View style={{flex: 1}}>
    {startCamera ? (
    <View style={{ flex: 1}}>
       <View style={styles.cameraContainer}>
             <Camera 
             ref={ref => setCamera(ref)}
             style={{flex: 1,width:"100%"}} 
             type={type}
               />
       </View>
       <View style={{flex: .2}}>
       <Button
             title="Flip Image"
             onPress={() => {
               setType(
                 type === Camera.Constants.Type.back
                   ? Camera.Constants.Type.front
                   : Camera.Constants.Type.back
               );
             }}>
         </Button>
        <Button style={{marginBottom: 100}} title="Take Picture" onPress={() => takePicture()} />
         {image && <Image source={{uri: image}} style={{flex:1}}/>}
         </View>
       
    </View> ) : (
      <View style={styles.container}>
      <View style={styles.topContainer}>
      <View>
      <View style={styles.greetingdayContainer}>
      <Feather name="sun" size={16} color={Colors.highlight} />
      <Text style={styles.greeting}>{greeting}</Text>
      </View>
      <Text style={styles.greetingName}>{name}</Text>
      </View>
      <TouchableOpacity onPress={_startCamera}>
      <Image source={require('../assets/avatar.png')}
            style={styles.avatar} />
            </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.recentContainer}>
        <View>
          <Text style={styles.recentQuizText}>RECENT QUIZ</Text>
          <View style={styles.recentDetail}>
            <Feather name="music" size={20} color={'#665058'} />
            <Text style={styles.recentQuizTextDetail}>A Basic Music Quiz</Text>
          </View>
        </View>
        <View style={styles.currentScoreContainer}>
          <Text style={styles.percentage}>65%</Text>
        </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Selector')}>
        <Text>Play</Text>
      </TouchableOpacity>
     </View>
    )}
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
        height: 60
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