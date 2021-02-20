import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { MAX_HEIGHT, MAX_WIDTH } from '../constants';
import MainMenu from '../MainMenu';


export default class ModalComponent extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    visibleModal: 4,
  };

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Wrong!</Text>
      {this._renderButton('Game Over', () => {
        this.setState({ visibleModal: null })
        this.props.navigation.navigate("MainMenu")
      })}
    </View>
  );

  componentDidMount() {
    this.setState({ visibleModal: 4 })
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          isVisible={this.state.visibleModal === 4}
          backdropColor={'##053646'}
          backdropOpacity={1}
          animationIn={'zoomInDown'}
          animationOut={'zoomOutUp'}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
        >
          <MainMenu hideModal={ () =>{
            this.setState({ visibleModal: null })
            this.props.setModal(false)
          }} />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: MAX_WIDTH,
    height: MAX_HEIGHT,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#053646",
  },
  button: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
  },
});