/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, ImageBackground, TouchableOpacity, Image, TextInput, Button, View, Alert } from 'react-native';
import { createStackNavigator, } from 'react-navigation'

class ImageButton extends Component {

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={this.props.style}>
        <Image source={this.props.source} style={this.props.imageStyle} ></Image>
      </TouchableOpacity>
    )
  }
}

class HomeScreen extends Component {

  static navigationOptions = {
    title: "Home"
  }

  _navigateToOnboarding(navigate) {
    navigate("Step1")
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

class BaseStep extends Component {
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
  }

  _onCloseButtonClick() {
    this.props.navigation.popToTop()
  }

  _goToNextPage() {
    switch (this.state.currentPosition) {
      case 1:
        this.props.navigation.navigate("Step2")
        break
      case 2:
        this.props.navigation.navigate("Step3")
        break
      case 3:

        break
    }

  }

  _goToPreviousPage() {
    this.props.navigation.goBack()
  }
}

class FirstStepScreen extends BaseStep {

  constructor() {
    super()
    this.state = { currentPosition: 1 }
  }

  render() {
    let text = "Give your picture the power to change the world. Choose a campaign you love and post to support them"
    return (
      <ImageBackground source={require("./resources/images/onboarding_01.png")} style={styles.container}>

        {/* Close button */}
        <View style={{ alignItems: "flex-end", flexDirection: "column" }}  >
          <ImageButton source={require("./resources/icons/ic_close.png")}
            imageStyle={styles.generalComponent}
            onPress={this._onCloseButtonClick} />
        </View>

        {/* Content */}
        <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "baseline" }}>
          <ImageButton source={require("./resources/icons/ic_previous.png")} imageStyle={styles.arrowButton}
            onPress={this._goToPreviousPage} />
          <Text style={styles.onboardingText}>{text}</Text>
          <ImageButton source={require("./resources/icons/ic_next.png")} imageStyle={styles.arrowButton}
            onPress={this._goToNextPage} />
        </View>
      </ImageBackground>
    )
  }
}

class SecondStepScreen extends BaseStep {

  constructor() {
    super()
    this.state = { currentPosition: 2 }
  }

  render() {
    let text = "For every 'like' your photo gets on Pixhug and Facebook, the sponsor donate 10$ to the campain."
    return (
      <ImageBackground source={require("./resources/images/onboarding_02.png")} style={styles.container}>

        {/* Close button */}
        <View style={{ alignItems: "flex-end", flexDirection: "column" }}  >
          <ImageButton source={require("./resources/icons/ic_close.png")}
            imageStyle={styles.generalComponent}
            onPress={this._onCloseButtonClick} />
        </View>

        {/* Content */}
        <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "baseline" }}>
          <ImageButton source={require("./resources/icons/ic_previous.png")} imageStyle={styles.arrowButton}
            onPress={this._goToPreviousPage} />
          <Text style={styles.onboardingText}>{text}</Text>
          <ImageButton source={require("./resources/icons/ic_next.png")} imageStyle={styles.arrowButton}
            onPress={this._goToNextPage} />
        </View>
      </ImageBackground>
    )
  }
}

class ThirdStepScreen extends BaseStep {

  constructor() {
    super()
    this.state = { currentPosition: 3 }
  }

  render() {
    let text = "Start Changing the world now by signing up with Facebook."
    return (
      <ImageBackground source={require("./resources/images/onboarding_03.png")} style={styles.container}>

        {/* Close button */}
        <View style={{ alignItems: "flex-end", flexDirection: "column" }}  >
          <ImageButton source={require("./resources/icons/ic_close.png")}
            imageStyle={styles.generalComponent}
            onPress={this._onCloseButtonClick} />
        </View>

        {/* Content */}
        <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "baseline" }}>
          <ImageButton source={require("./resources/icons/ic_previous.png")} imageStyle={styles.arrowButton}
            onPress={this._goToPreviousPage} />
          <Text style={styles.onboardingText}>{text}</Text>
          <ImageButton source={require("./resources/icons/ic_next.png")} imageStyle={styles.arrowButton}
            onPress={this._goToNextPage} />
        </View>
      </ImageBackground>
    )
  }
}

const App = createStackNavigator({
  Home: HomeScreen,
  Step1: FirstStepScreen,
  Step2: SecondStepScreen,
  Step3: ThirdStepScreen,
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
    margin: 10,
    alignSelf: "stretch",
  }
})

