import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React from 'react'

const CategoryItem = ({item}) => {
  return (
    <View style={{width: '50%'}}>
      <TouchableOpacity>
          <View style={styles.category}>
            <View style={styles.imageContainer}>
            <Image source={require('../assets/general.png')} style={styles.imageCategory}/>
            </View>
            <Text style={styles.categoryText}>{decodeURIComponent(item.name)}</Text>
            <Text>21 Questions</Text>
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
        textAlign: 'center'
      },
      category: {
        borderRadius: 15,
        backgroundColor: '#EEEEF3',
        padding: 20,
        alignItems:'center',
        margin: 15
      },
      imageCategory: {
        width: 60,
        height: 60
      },
      imageContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 2,
        marginBottom: 10
      }
})