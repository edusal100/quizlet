import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import AnimatedLottieView from 'lottie-react-native'
import { Colors } from '../constants/colors'
import { Feather } from '@expo/vector-icons';
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { resetScore } from '../redux/gameSlice';

const Result = ({navigation}) => {

  const score = useSelector(state => state.gameData)
  const dispatch = useDispatch();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Hey there, I get '+ score.value + ' points at the greatest game ever created | Quizlet',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  


  return (
    <View style={styles.container}>
        <Text style={styles.title}>Good Job!</Text>
      <View style={styles.scoreContainer}>
      <View style={styles.bannerContainer}>
            <AnimatedLottieView source={require('../assets/winner.json')} autoPlay loop style={{marginTop:-60}}/>
      </View>
      <Text style={styles.scoreValue}>You get +{score.value}  Quiz Points</Text>
      <TouchableOpacity style={styles.buttonCorrectAnswer}>
        <Text style={styles.correctAnswer}>Check Correct Anwser</Text>
      </TouchableOpacity>
      </View>
      <View style={{flex:1}}>
      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
        <View>
          <Text style={styles.accurateText}>CORRECT ANSWER</Text>
          <Text style={{fontWeight:'bold', fontSize:20}}>{score.value/10} questions</Text>
          <Text style={styles.accurateText}>SKIPPED</Text>
          <Text style={{fontWeight:'bold', fontSize:20}}>2</Text>
        </View>
        <View>
          <Text style={styles.accurateText}>COMPLETION</Text>
          <Text style={{fontWeight:'bold', fontSize:20}}>80%</Text>
          <Text style={styles.accurateText}>INCORRECT ANSWER</Text>
          <Text style={{fontWeight:'bold', fontSize:20}}>{10-(score.value/10)}</Text>
        </View>
      </View>
    </View>
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={()=>{navigation.navigate("Home"); dispatch(resetScore())}} style={styles.button}>
            <Text style={{color:'white', fontWeight: 'bold', fontSize: 15}}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare} style={{borderColor: Colors.gray, borderRadius: 16, borderWidth:1, marginBottom: 20, padding:16}}>
            <Feather name="share-2" size={24} color={Colors.main}/>
          </TouchableOpacity>
        </View>
        <StatusBar style='dark'/>
    </View>
  )
}

export default Result

const styles = StyleSheet.create({
bannerContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  height: 360,
},
container: {
  paddingTop: 60,
  paddingHorizontal: 20,
  flex: 1,
  backgroundColor: 'white'
},
button: {
  widht: '100%',
  backgroundColor: Colors.main,
  padding: 16,
  borderRadius: 16,
  alignItems: 'center',
  marginBottom: 20,
  flex:2,
  marginRight: 20
},
buttonText: {
  fontSize: 24,
  fontWeight: 'bold',
  color: 'white',
},
scoreValue: {
  fontSize: 20,
  fontWeight:'800',
  alignSelf: 'center',
  color: 'white',
  marginTop: -80
},
title: {
  fontSize: 25,
  fontWeight: 'bold',
  alignSelf: 'center',
  marginBottom: 15
},
scoreContainer: {
  backgroundColor: Colors.highlight,
  borderRadius: 20
},
correctAnswer: {
  color: 'white',
  fontSize: 16,
  alignSelf: 'center',
  fontWeight: 'bold'
},
buttonCorrectAnswer: {
  paddingVertical: 15,
  width: '80%',
  backgroundColor: Colors.secondary,
  alignSelf: 'center',
  borderRadius: 18,
  marginVertical: 20
},
accurateText: {
  fontWeight: 'bold',
  color: Colors.gray,
  marginTop: 15,
  fontSize: 14,
  alignSelf: 'flex-start',
  marginBottom: 8
}

})