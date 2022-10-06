import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import {Colors} from '../constants/colors';
import { Feather } from '@expo/vector-icons';
import React from 'react'

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
      <View>
      <View style={styles.greetingdayContainer}>
      <Feather name="sun" size={20} color={Colors.highlight} />
      <Text style={styles.greeting}>GOOD MORNING</Text>
      </View>
      <Text style={styles.greetingName}>Madelyn Dias</Text>
      </View>
      <Image source={require('../assets/avatar.png')}
            style={styles.avatar} />
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
      <TouchableOpacity>
        <Text onPress={() => navigation.navigate("Selector")}
        style={{color:'white', fontStyle: 'bold', fontSize: 18, alignSelf: 'flex-end', marginTop: 20}}>
          Play Game</Text>
      </TouchableOpacity>
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
        fontSize: 15,
        fontWeight: 'bold',
        marginStart: 10,
      },
      greetingdayContainer: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      greetingName: {
        fontSize: 25,
        fontWeight: 'bold',
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
      }
      
})