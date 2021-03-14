import React, { useState, useEffect } from 'react'
import SwitchSelector from "react-native-switch-selector"
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { MAX_HEIGHT, MAX_WIDTH, TouchableWrapper } from './constants'
import AsyncStorage from '@react-native-community/async-storage'
export default function Settings({route}) {
  const [highScore, setHighScore] = useState(0)
  useEffect(() => {
    getValue()
  }, [])
  useEffect(() => {
    console.log(params.vibro)
  })
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
      highScore && await AsyncStorage.setItem("HIGH_SCORE", "0")
    }
    catch(e) {
      console.log("setValue", e)
    }
  }
  const options = [
    { label: "On", value: true },
    { label: "Off", value: false },
  ];
  const {params} = route
  const toggleSwitch = () => params.setVibro(!params.vibro)
  return (
    <View style={styles.container} >
      <View style={styles.item} >
        <Text style={styles.text}>Vibration</Text>
        <SwitchSelector
        value={params.vibro}
        onPress={toggleSwitch}
  options={options}
  initial={params.vibro ? 0 : 1}
  onPress={() => toggleSwitch()}
/>
    </View>
    <TouchableWrapper onPress={() => setValue()} style={styles.btn} >
        <Text style={styles.BtnText} >Reset highscore</Text>
      </TouchableWrapper>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: MAX_HEIGHT * 0.1,
    backgroundColor: "#053646",
  },
  item: {
    width: MAX_WIDTH * 0.9,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
  },
  text: {
    fontSize: MAX_HEIGHT * 0.05,
    fontWeight: "600",
    textAlign: "center",
    color: "#fff"
  },
  btn: {
    width: MAX_WIDTH * 0.9,
    marginVertical: 10,
    padding: 10,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#fff",
    borderRadius: 10
  },
  BtnText: {
    fontSize: MAX_HEIGHT * 0.05,
    fontWeight: "600",
    textAlign: "center",
    color: "#fff"
  }
})