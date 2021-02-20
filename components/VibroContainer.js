import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Vibration,
} from 'react-native';
import { Constants } from 'expo';

import { Card } from 'react-native-paper';

import { Accelerometer } from 'expo-sensors';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  makeVibration() {
    Vibration.vibrate([100]);
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.makeVibration}>
          <Text style={styles.paragraph}>Press here to test vibration.</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
