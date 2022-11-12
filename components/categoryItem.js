import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react';

import { Colors } from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react'

const CategoryItem = ({item, onSelected}) => {

  const [questionsCount, setQuestionsCount] = useState();
  const [isActive, setIsActive] = useState(false);
  
  const getQuestionsCount = async ()=> {
  const url= 'https://opentdb.com/api_count.php?category=' + item.id;
  const res = await fetch (url);
  const data = await res.json();
  setQuestionsCount(data.category_question_count.total_question_count)
}

useEffect(()=>{
  getQuestionsCount()
}, [])



  return (
    <View style={{width: '50%'}}>
      <TouchableOpacity onPress={() => {onSelected(item); 
        setIsActive(current => !current)
        }}>
          <View style= {isActive ? styles.categoryActive : styles.category}>
            <View style={isActive ? styles.imageContainerActive : styles.imageContainer}>
            <MaterialIcons name={item.image} size={30} color= { isActive ? 'white' : Colors.main} />
            </View>
            <Text style={ isActive ? styles.categoryTextActive: styles.categoryText}>{decodeURIComponent(item.name)}</Text>
            <Text style={ isActive ? styles.countTextActive: styles.countText}>{questionsCount + " Questions"}</Text>
          </View>
          </TouchableOpacity> 
    </View>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
      categoryText:{
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'#648DE5'
      },
      categoryTextActive: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'white'
      },
      category: {
        borderRadius: 25,
        backgroundColor:'#EEEEF3',
        padding: 12,
        alignItems:'center',
        margin: 7,
        minHeight: 160,
        justifyContent: 'center'
      },
      categoryActive: {
        borderRadius: 25,
        backgroundColor:'#ffc8dd',
        padding: 12,
        alignItems:'center',
        margin: 7,
        minHeight: 160,
        justifyContent: 'center'
      },
      imageContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
      },
      imageContainerActive: {
        backgroundColor: 'rgba(52, 52, 52, 0.1)',
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
      },
      countText: {
        color: '#648DE5',
        fontWeight:'400',
        fontSize: 13
      },
      countTextActive: {
          color: 'white',
          fontWeight:'400',
        fontSize: 13
      }
})