import React from 'react'
import { Vibration, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MAX_WIDTH } from '../constants'

export default function AnswerItem({text, setSelected, correct, vibro}) {
  const makeVibration = () => {
    Vibration.vibrate([100])
  }
  return (
    <TouchableOpacity style={styles.container} onPress={() => {
      setSelected(text)
      vibro && correct !== text && makeVibration()
    }} >
<Text style={styles.text} >{text} </Text>
</TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    width: MAX_WIDTH * 0.9,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    borderWidth: 5,
    borderColor: "#1CCA56",
    borderRadius: 4
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    color: "#000"
  }
})
