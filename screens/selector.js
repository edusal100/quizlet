import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { clearCategory, selectCategory } from '../redux/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import AnimatedLottieView from 'lottie-react-native'
import CategoryItem from '../components/categoryItem';
import { Colors } from '../constants/colors';
import { Feather } from '@expo/vector-icons';
import { ImageList } from '../data/imageList';
import React from 'react'

const Selector = ({navigation}) => {
    const dispatch = useDispatch();
    const [listCategory, setListCategory] = useState();
    const category = useSelector(state => state.category)
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
    setTimeout(()=> {
      navigation.navigate('Quiz')
    },200)
}

  const renderItem = ({ item }) => <CategoryItem item={item} onSelected={onSelected} />

  return (
    <View style={styles.container}>
      {listCategory ? (
        <View style={{flex:1}}>
        <Text style={styles.title}>Choose Category</Text>
      <View style={styles.parent}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.categoryContainer}
            numColumns={2}
            data={listCategory}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />   
      <TouchableOpacity style={styles.button} onPress={()=> {dispatch(clearCategory()), navigation.navigate('Quiz')}}>
          <Text style={styles.buttonText}>Random Category</Text>
          <Feather name="refresh-ccw" size={24} color="white" />
        </TouchableOpacity>
        </View>
        </View>): (
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.loadingText}>Setting up your game</Text>
            <AnimatedLottieView source={require('../assets/loginAnimation.json')} autoPlay loop style={{height:350}}/>
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
        flexDirection: 'row',
        justifyContent: 'center',
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
        marginRight: 20
      },
      categoryContainer: {
        flex: 1,
      },
      loadingText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
      }

})