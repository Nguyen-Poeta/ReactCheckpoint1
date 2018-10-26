/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, ImageBackground, TouchableOpacity, Image, TextInput, Button, View, Alert } from 'react-native';
import PropTypes from 'prop-types'
import { createStackNavigator, } from 'react-navigation'

const backButtonImage = require("./resources/icons/ic_previous.png")
const nextButtonImage = require("./resources/icons/ic_next.png")
const background1 = require("./resources/images/onboarding_01.png")
const background2 = require("./resources/images/onboarding_02.png")
const background3 = require("./resources/images/onboarding_03.png")

class ImageButton extends Component {

  render() {
    return (
      <View style={this.props.style}>
        <TouchableOpacity onPress={this.props.onPress} style={!this.props.visible ? { display: 'none' } : null}>
          <Image source={this.props.source} style={this.props.imageStyle} ></Image>
        </TouchableOpacity>
      </View>
    )
  }
}

ImageButton.propTypes = {
  visible: PropTypes.bool,
}

ImageButton.defaultProps = {
  visible: true,
}


class HomeScreen extends Component {

  static navigationOptions = {
    title: "Home"
  }

  _navigateToOnboarding(navigate) {
    navigate("OnBoarding")
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View>
        <Button title="Click here to go to OnBoarding" onPress={() => { this._navigateToOnboarding(navigate) }} />
      </View>
    )
  }

  componentDidMount() {
    const { navigate } = this.props.navigation
    this._navigateToOnboarding(navigate)
  }
}

class OnBoardingScreen extends Component {
  static navigationOptions = {
    title: " ",
    headerRight: null,
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#00000000',
      height: 0
    }
  }

  constructor() {
    super()
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this)
    this._goToNextPage = this._goToNextPage.bind(this)
    this._goToPreviousPage = this._goToPreviousPage.bind(this)
    this._getCurrentText = this._getCurrentText.bind(this)
    this._getCurrentBackgroundImage = this._getCurrentBackgroundImage.bind(this)
    this.state = { currentPosition: 0 }
  }

  _onCloseButtonClick() {
    this.props.navigation.popToTop()
  }

  _goToNextPage() {
    this.setState(previousState => {
      nextPosition = previousState.currentPosition + 1
      return { currentPosition: nextPosition }
    })
  }

  _goToPreviousPage() {
    this.setState(previousState => {
      nextPosition = previousState.currentPosition - 1
      return { currentPosition: nextPosition }
    })
  }

  _getCurrentText() {
    switch (this.state.currentPosition) {
      case 0:
        return "Give your picture the power to change the world. Choose a campaign you love and post to support them"
      case 1:
        return "For every 'like' your photo gets on Pixhug and Facebook, the sponsor donate 10$ to the campain."
      case 2:
        return "Start Changing the world now by signing up with Facebook."
      default:
        return "Hello"
    }
  }

  _getCurrentBackgroundImage() {
    switch (this.state.currentPosition) {
      case 0:
        return background1
      case 1:
        return background2
      case 2:
        return background3
      default:
        return background1
    }
  }

  _isShowPreviousButton() {
    if (this.state.currentPosition == 0) {
      return false
    } else {
      return true
    }
  }

  _isShowNextButton() {
    if (this.state.currentPosition == 2) {
      return false
    } else {
      return true
    }
  }

  render() {
    let text = this._getCurrentText()
    let backgroundImage = this._getCurrentBackgroundImage()

    return (
      <ImageBackground source={backgroundImage} style={styles.container}>

        {/* Close button */}
        <View style={{ alignItems: "flex-end", flexDirection: "column" }}  >

          <ImageButton source={require("./resources/icons/ic_close.png")}
            imageStyle={styles.generalComponent}
            onPress={this._onCloseButtonClick} />
        </View>

        {/* Content */}
        <View style={{ flexDirection: "row", alignItems: "center", padding: 5}}>

          <ImageButton source={backButtonImage} imageStyle={styles.arrowButton} style={styles.arrowButton}
            onPress={this._goToPreviousPage} visible={this._isShowPreviousButton()} />

          <Text style={styles.onboardingText}>{text}</Text>

          <ImageButton source={nextButtonImage} imageStyle={styles.arrowButton} style={styles.arrowButton}
            onPress={this._goToNextPage} visible={this._isShowNextButton()} />
        </View>
      </ImageBackground>
    )
  }
}

const App = createStackNavigator({
  Home: HomeScreen,
  OnBoarding: OnBoardingScreen
})

export default App

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column'
  },
  generalComponent: {
    padding: 15,
    margin: 15
  },
  onboardingText: {
    fontSize: 28,
    color: "#FFFFFF",
    textAlign: "center",
    alignSelf: "stretch",
    flex: 1,
    margin: 20
  },
  arrowButton: {
    width: 18,
    height: 30,
  }
})

