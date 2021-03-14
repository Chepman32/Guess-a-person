import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, StatusBar, SafeAreaView, Alert } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { AdMobComponent } from './components/AdMobComponent'
import AnswerItem from './components/AnswerItem'
import Scores from './components/Scores'
import { generateRandomBetween, MAX_HEIGHT, MAX_WIDTH, randomNumber } from './constants'
import { data } from './data'
import { DB } from './db'
import ModalComponent from './components/ModalComponent'
import AsyncStorage from '@react-native-community/async-storage';
const db = SQLite.openDatabase('db.db')
export default function Gamescreen({route}) {
  const {params} = route
  const [fullData, setFullData] = useState([...data])
  const [ismodalOn, setIsModalOn] = useState(false)
  const [played, setPlayed] = useState(0)
  const [archivedQuestions, setArchivedQuestions] = useState("")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [question, setQuestion] = useState()
  const [selected, setSelected] = useState()
  const [isCorrect, setIsCorrect] = useState()
  const navigation = useNavigation()
  const setData = (data) => {
    try {
      AsyncStorage.setItem("DATA", JSON.stringify(data))
    }
    catch(e) {
      console.log(e)
    }
  }
  
  const getData = async () => {
    setQuestion(fullData[generateRandomBetween(0, fullData.length, fullData.indexOf(question))])
    setArchivedQuestions(archivedQuestions => [...archivedQuestions, question])
    try {
      if(question && question.id === archivedQuestions[archivedQuestions.length - 1]) {
        setQuestion(filtered[generateRandomBetween(0, filtered.length, filtered.indexOf(question))])
      }
      const value = await AsyncStorage.getItem("DATA")
      let obj = JSON.parse(value)
      var filtered = archivedQuestions.length ? obj.filter((elem) => !archivedQuestions.find(({ id }) => elem.id === id)) : [...data]
       setFullData(fullData => obj)
       setData(filtered)

       filtered.length === 0 && navigation.navigate("MainMenu")
      console.log("getData", filtered.length)
    }
    catch(e) {
      console.log(e)
    }
  }

  const getValue = async () => {
    try {
      const value = await AsyncStorage.getItem("HIGH_SCORE")
      setHighScore(value)
    }
    catch(e) {
      console.log("getValue", e)
    }
  }

  const setValue = async () => {
    try {
      score > highScore && AsyncStorage.setItem("HIGH_SCORE", score.toString())
    }
    catch(e) {
      console.log("setValue", e)
      AsyncStorage.setItem("HIGH_SCORE", score.toString())
    }
  }
  useEffect(() => {
    console.log("archivedQuestions", archivedQuestions.length)
    console.log("fullData", fullData.length)
    if(question && archivedQuestions.length && question.id === archivedQuestions[archivedQuestions.length - 1].id) {
      setQuestion(fullData[generateRandomBetween(0, fullData.length, fullData.indexOf(question))])
    }
  })

  useEffect(() => {
    setArchivedQuestions([])
    setFullData(data)
    getValue()
      setData(data)
      setQuestion(fullData[randomNumber(0, fullData.length - 1)])
  }, [])
  useEffect(() => {
    setValue()
    getValue()
  })
  useEffect(() => {
    if(question && selected === question.correct) {
      console.log(archivedQuestions.length)
      getData()
      setIsCorrect(true)
      setTimeout(() => {
      setIsCorrect(undefined)
      setPlayed(played + 1)
      setScore(score + 20)
      }, 400)
      setValue()
      getValue()
    }
    if(question && selected !== question.correct) {
      setIsCorrect(false)
      setPlayed(played + 1)
      getValue()
      setValue()
       setScore(0)
       setTimeout(() => {
        setIsModalOn(true)
       }, 400)
       setTimeout(() => {
        setQuestion(fullData[generateRandomBetween(0, fullData.length, fullData.indexOf(question))])
        navigation.navigate("MainMenu")
       }, 1250)
    }
  }, [selected])

  return (
    <SafeAreaView style={styles.container} >
      <Text style={styles.highscore} >Your highscore is {highScore} </Text>
      {
        question && <Image source={question.img} resizeMode="contain" style={styles.img} />
      }
      {
       ismodalOn &&
        <ModalComponent
        navigation={navigation}
        setModal={(value) => setIsModalOn(value)} />
      }
      {
      isCorrect === undefined &&
      <Text style={styles.question} >Who's that?</Text>
      }
      {
      isCorrect === false &&
      <Text style={{...styles.question, color: "tomato"}} >Wrong </Text>
      }
      {
      isCorrect &&
      <Text style={{...styles.question, color: "#20BEF1"}} >Right</Text>
      }
      <View>
        {
        question && question.vars.length > 0 && question.vars.map(
          v => <AnswerItem key={Math.random().toString()} text={v} vibro={params.vibro}
          selected={selected}
          setSelected={setSelected}
          correct={question.correct} />
        )
        }
      </View>
      <View style={styles.score}>
      <Scores text={score} padding={score.toString().length + 1} duration={played === 0 ? 1500 : 900} />
      </View>
      
      <StatusBar hidden={true}/>
      {
        !ismodalOn && <AdMobComponent isCorrect={isCorrect} />
      }
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: MAX_HEIGHT * 0.1,
    backgroundColor: "#053646",
  },
  score: {
    position: "absolute",
    top: MAX_HEIGHT * 0.1,
    right: MAX_WIDTH * 0.1,
  },
  highscore: {
    position: "absolute",
    top: 30,
    left: 30,
    flexDirection: "row",
    fontSize: 30,
    color: "#fff"
  },
  img: {
    height: MAX_HEIGHT * 0.4
  },
  question: {
    fontSize: MAX_HEIGHT * 0.05,
    fontWeight: "600",
    textAlign: "center",
    color: "#fff"
  },
  modal: {
    width: MAX_WIDTH * 0.4,
    height: MAX_HEIGHT * 0.4
  }
})
