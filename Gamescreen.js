import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, StatusBar, SafeAreaView, Alert } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { AdMobComponent } from './components/AdMobComponent'
import AnswerItem from './components/AnswerItem'
import Scores from './components/Scores'
import { MAX_HEIGHT, MAX_WIDTH, randomNumber } from './constants'
import { data } from './data'
import { DB } from './db'
import ModalComponent from './components/ModalComponent'
const db = SQLite.openDatabase('db.db')
export default function Gamescreen({route}) {
  const {params} = route
  const [fullData, setFullData] = useState(data)
  const [filtered, setFiltered] = useState(data)
  const [ismodalOn, setIsModalOn] = useState(false)
  const [played, setPlayed] = useState(0)
  const [archivedQuestions, setArchivedQuestions] = useState("")
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState()
  const [selected, setSelected] = useState()
  const [isCorrect, setIsCorrect] = useState()
  const navigation = useNavigation()
  const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }
  let unUsedData = []
  const archiveQuestion = (num) => {
    setFiltered(filtered => [...filtered, JSON.stringify(question)])
    const res = fullData.filter(f => f.id !== filtered.find(obj => obj.id === f))
    setFullData(res)
    setQuestion(res[randomNumber(0, res.length)])
    console.log(fullData.indexOf(question))
  }
  function getNew() {
    let index = data.indexOf(question)
    let newIndex = data.indexOf(data[randomNumber(0, data.length - 1)])
    if(newIndex !== index) {
      setQuestion(data[newIndex])
    }
  }
  useEffect(() => {
    setQuestion(data[randomNumber(0, data.length - 1)])
  }, [])
  useEffect(() => {
    if(question && selected === question.correct) {
      setArchivedQuestions([...archivedQuestions, question])
      console.log(archivedQuestions.length)
      archiveQuestion()
      setIsCorrect(true)
      setTimeout(() => {
      setIsCorrect(undefined)
      setPlayed(played + 1)
      setScore(score + 20)
      
      }, 400)
    }
    if(question && selected !== question.correct) {
      setIsCorrect(false)
      setPlayed(played + 1)
       setScore(0)
       setTimeout(() => {
        setIsModalOn(true)
       }, 400)
       setTimeout(() => {
        setQuestion(data[randomNumber(0, data.length - 1)])
        navigation.navigate("MainMenu")
       }, 1250)
    }
  }, [selected])

  return (
    <SafeAreaView style={styles.container} >

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
    top: 30,
    right: 30,
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
