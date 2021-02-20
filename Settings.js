import React, { useEffect } from 'react'
import SwitchSelector from "react-native-switch-selector"
import { View, Text, StyleSheet } from 'react-native'
import { MAX_HEIGHT, MAX_WIDTH } from './constants'
export default function Settings({route}) {
  useEffect(() => {
    console.log(params.vibro)
  })
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
  }
})