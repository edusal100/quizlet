import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react';

import CategoryItem from '../components/categoryItem';
import { Colors } from '../constants/colors';
import { ImageList } from '../data/imageList';
import React from 'react'
import { selectCategory } from '../redux/categorySlice';
import { useDispatch } from 'react-redux';

const Selector = ({navigation}) => {
    const dispatch = useDispatch();
    const [listCategory, setListCategory] = useState();

    const getCategory = async ()=> {
    const url= 'https://opentdb.com/api_category.php';
    const res = await fetch (url);
    const data = await res.json();
    const trivia = data.trivia_categories;
    const addId = ImageList.reduce((acc, curr) => {
      acc[curr.id] = curr
      return acc
    }, {});
    const triviaImage = trivia.map(d => Object.assign(d, addId[d.id]));
    setListCategory(triviaImage)
    
  }
  useEffect(()=>{
    getCategory()
  }, [])

  const onSelected = (item) => {
    dispatch(selectCategory(item));
}

  const renderItem = ({ item }) => <CategoryItem item={item} onSelected={onSelected} />

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Choose Category</Text>
        {listCategory&&(
      <View style={styles.parent}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.categoryContainer}
            numColumns={2}
            data={listCategory}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />   
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Quiz')}>
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>

        </View>)}
    </View>
  )
}

export default Selector

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.main,
        paddingHorizontal: 10,
        paddingBottom: 10,
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
        backgroundColor: Colors.main,
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