import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import AnimatedLottieView from 'lottie-react-native'
import { Colors } from '../constants/colors';
import { updateScore } from '../redux/gameSlice';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

const Quiz = ({navigation}) => {

  const category = useSelector(state => state.category)
  const score = useSelector(state => state.gameData)
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState();
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [skipped, setSkipped] = useState (0);
  const [selectedOptionCorrect, setSelectedOptionCorrect] = useState ()
  const [selectedOptionIncorrect, setSelectedOptionIncorrect] = useState ()
  

  const getQuiz = async ()=> {
    const url= 'https://opentdb.com/api.php?amount=10&category='+ category.id +'&difficulty=easy&type=multiple&encode=url3986';
    const res = await fetch (url);
    const data = await res.json();
    setQuestions(data.results)
    setOptions(generateOptionsAndShuffle (data.results[0]))
  }

  useEffect(()=>{
    getQuiz()
  }, [])

  const handleNextPress = ()=> {
    setQues(ques + 1)
    setOptions(generateOptionsAndShuffle(questions[ques+1]))
  }

  const generateOptionsAndShuffle = (_question) => {
    const options = [..._question.incorrect_answers]
    options.push(_question.correct_answer)
    shuffleArray(options)

    return options
  }

  const handleSelectedOption = (_option) => {  
    
    if(_option===questions[ques].correct_answer){
      dispatch(updateScore(+10))
      setSelectedOptionCorrect(options.indexOf(_option))
    } 
    setSelectedOptionIncorrect(options.indexOf(_option))
    if(ques!==9){
      setTimeout(()=> {
      setQues(ques + 1)
      setSelectedOptionCorrect(4)
      setSelectedOptionIncorrect(4)
      setOptions(generateOptionsAndShuffle(questions[ques+1]))
      },1000)
    }
    if(ques===9) {
      
    }
  }

  const handleShowResult=()=>{
    navigation.navigate('Result')
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBack} source={require('../assets/mainBackground.png')}>
      {questions&& (
      <View style={styles.parent}>
        <View style={styles.currentScoreContainer}>
          <Text style={styles.currentScore}>
            {score.value}
            </Text>
        </View>
        <Text style={styles.categoryText}>{category.name}</Text>
        <Text style={styles.secondaryText}>QUESTION {ques+1} OF 10</Text>
      <View style={styles.top}>
        <Text style={styles.question}>{decodeURIComponent(questions[ques].question)}</Text>
      </View>
      <View style={styles.options}>
        <TouchableOpacity style={selectedOptionCorrect == 0 ? styles.optionButtonPressGreen : styles.optionButton} onPress={()=>handleSelectedOption(options[0])}>
          <Text style={styles.option}>{decodeURIComponent(options[0])}</Text>
          {selectedOptionCorrect == 0 && (<AnimatedLottieView source={require('../assets/correct.json')} autoPlay loop style={styles.correctAnimation}
            />)}
          </TouchableOpacity>
        <TouchableOpacity style={selectedOptionCorrect == 1 ? styles.optionButtonPressGreen : styles.optionButton} onPress={()=>handleSelectedOption(options[1])}>
          <Text style={styles.option}>{decodeURIComponent(options[1])}</Text>
          {selectedOptionCorrect == 1 && (<AnimatedLottieView source={require('../assets/correct.json')} autoPlay loop style={styles.correctAnimation}
            />)}
          </TouchableOpacity>
        <TouchableOpacity style={selectedOptionCorrect == 2 ? styles.optionButtonPressGreen : styles.optionButton} onPress={()=>handleSelectedOption(options[2])}>
          <Text style={styles.option}>{decodeURIComponent(options[2])}</Text>
          {selectedOptionCorrect == 2 && (<AnimatedLottieView source={require('../assets/correct.json')} autoPlay loop style={styles.correctAnimation}
            />)}
          </TouchableOpacity>
        <TouchableOpacity style={selectedOptionCorrect == 3 ? styles.optionButtonPressGreen : styles.optionButton} onPress={()=>handleSelectedOption(options[3])}>
          <Text style={styles.option}>{decodeURIComponent(options[3])}</Text>
          {selectedOptionCorrect == 3 && (<AnimatedLottieView source={require('../assets/correct.json')} autoPlay loop style={styles.correctAnimation}
            />)}
          </TouchableOpacity>
      </View>
      <View style={styles.bottom}>

    {ques !== 9 &&
        <TouchableOpacity style={styles.button} onPress={handleNextPress}>
          <Text style={styles.buttonText}>SKIP</Text>
        </TouchableOpacity>}
    {ques === 9 &&
        <TouchableOpacity style={styles.button} onPress={handleShowResult}>
          <Text style={styles.buttonText}>SHOW RESULTS</Text>
        </TouchableOpacity>}

      </View>
      </View>)}
      </ImageBackground>     
    </View>
  )
}

export default Quiz

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    marginVertical: 5
  },
  options: {
    marginVertical: 16,
    flex: 1
  },
  bottom: {
    justifyContent: 'space-between',
    flexDirection: 'row'
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
  question: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  option: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionButton: {
    flexDirection: 'row',
    paddingVertical: 12,
    marginVertical: 6,
    borderColor: Colors.lightgray,
    borderWidth: 0.5,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  optionButtonPressGreen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: 50,
    marginVertical: 6,
    borderColor: Colors.transparentgreen,
    borderWidth: 1,
    backgroundColor: Colors.transparentgreen,
    paddingLeft: 12,
    borderRadius: 15
  },
  optionButtonPressRed: {
    flexDirection: 'row',
    maxHeight: 55,
    marginVertical: 6,
    borderColor: Colors.lightgray,
    borderWidth: 1,
    backgroundColor: Colors.lightgray,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  parent:{
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 20,
  },
  secondaryText: {
    fontSize: 15,
    color: '#a6a6a6',
    fontWeight: 'bold'
  },
  imageBack: {
    flex:1,
    paddingHorizontal:10,
    paddingBottom:10,
    paddingTop: 40
  },
  currentScoreContainer: {
    borderRadius: 60,
    height: 60,
    width: 60,
    backgroundColor: '#FFBEEF',
    alignSelf: 'center',
    marginBottom: 30,
    justifyContent: 'center'
  },
  currentScore: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center'
  },
  categoryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#808080'
  },
  correctAnimation: {
    width: 100,
    marginLeft: 15,
  }

})