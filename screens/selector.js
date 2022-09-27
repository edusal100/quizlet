import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react';

import CategoryItem from '../components/categoryItem';
import React from 'react'

const Selector = () => {
    const [listCategory, setListCategory] = useState();

    const getCategory = async ()=> {
    const url= 'https://opentdb.com/api_category.php';
    const res = await fetch (url);
    const data = await res.json();
    setListCategory(data.trivia_categories)
  }

  useEffect(()=>{
    getCategory()
  }, [])

  const renderItem = ({ item }) => <CategoryItem item={item}/>

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBack} source={require('../assets/blue.jpeg')}>
        <Text style={styles.title}>Choose Category</Text>
        {listCategory&&(
      <View style={styles.parent}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
            numColumns={2}
            data={listCategory}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />   
      <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>

        </View>)}
     </ImageBackground>
    </View>
  )
}

export default Selector

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
    imageBack: {
        flex:1,
        paddingHorizontal:10,
        paddingBottom:10,
        paddingTop: 40
      },
      parent:{
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 20,
        marginTop: 20
      },
      title: {
        color: 'white',
        fontSize: 28,
        alignSelf: 'center',
        marginTop: 30
      },
      button: {
        backgroundColor: '#648DE5',
        padding: 12,
        paddingHorizontal: 16,
        borderRadius: 15,
        alignItems: 'center',
        width: '100%'
      },
      buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
      },
      categoryContainer: {
        flex: 1,
      }

})