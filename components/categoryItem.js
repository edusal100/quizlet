import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react';

import React from 'react'

const CategoryItem = ({item, onSelected}) => {

  const [questionsCount, setQuestionsCount] = useState();

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
      <TouchableOpacity onPress={() => onSelected(item)}>
          <View style= {styles.category}>
            <View style={styles.imageContainer}>
            <Image source={require('../assets/general.png')} style={styles.imageCategory}/>
            </View>
            <Text style={styles.categoryText}>{decodeURIComponent(item.name)}</Text>
            <Text style={styles.countText}>{questionsCount + " Questions"}</Text>
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
      category: {
        borderRadius: 25,
        backgroundColor: '#EEEEF3',
        padding: 20,
        alignItems:'center',
        margin: 7
      },
      imageCategory: {
        width: 50,
        height: 50
      },
      imageContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 2,
        marginBottom: 10
      },
      countText: {
        color: '#648DE5',
        fontWeight:'400',
        fontSize: 13
      }
})