import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React from 'react'
import Title from '../components/title'

const Result = ({navigation, route}) => {

  const {score} = route.params
  const resultBanner = score<40?'https://cdni.iconscout.com/illustration/premium/thumb/businessman-dealing-with-business-failure-5623858-4678583.png':
  'https://cdni.iconscout.com/illustration/premium/thumb/team-celebrating-victory-5131796-4282459.png'

  return (
    <View style={styles.container}>
      <Title titleText = "Results"/>
      <Text style={styles.scoreValue}>{score}</Text>
      <View style={styles.bannerContainer}>
            <Image source={{uri:resultBanner}} 
            style={styles.banner} resizeMode='contain'/>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={styles.button}>
          <Text style={{color:'white'}}>GO TO HOME</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Result

const styles = StyleSheet.create({
  banner: {
    height: 300,
    width: 300
},
bannerContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
},
container: {
  paddingTop: 40,
  paddingHorizontal: 20,
  height: '100%',
},
button: {
  widht: '100%',
  backgroundColor: '#1A759F',
  padding: 16,
  borderRadius: 16,
  alignItems: 'center',
  marginBottom: 30,
},
buttonText: {
  fontSize: 24,
  fontWeight: '600',
  color: 'white',
},
scoreValue: {
  fontSize: 24,
  fontWeight:'800',
  alignSelf:'center'
}

})