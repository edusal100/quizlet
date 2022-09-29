import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react';

import CategoryItem from '../components/categoryItem';
import React from 'react'
import { setStatusBarBackgroundColor } from 'expo-status-bar';

const Selector = ({navigation, route}) => {
  
    const [listCategory, setListCategory] = useState();
    const [selectedItem, setSelectedItem] = useState();
    const [colorBg, setColorBg] = useState(false);

    const getCategory = async ()=> {
    const url= 'https://opentdb.com/api_category.php';
    const res = await fetch (url);
    const data = await res.json();
    setListCategory(data.trivia_categories)
  }

  useEffect(()=>{
    getCategory()
  }, [])

  const onSelected = (item) => {
    setSelectedItem(item);
}

  const renderItem = ({ item }) => <CategoryItem item={item} onSelected={onSelected} />

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
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Quiz', { categoryId: selectedItem })}>
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
        marginTop: 20,
        padding: 10
      },
      title: {
        color: 'white',
        fontSize: 28,
        alignSelf: 'center',
        marginTop: 30
      },
      button: {
        backgroundColor: '#648DE5',
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
        width: '98%',
        marginBottom: 5,
      },
      buttonText: {
        fontSize: 15,
        fontWeight: '600',
        color: 'white',
      },
      categoryContainer: {
        flex: 1,
      }

})