// @flow
import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { addToFavourites } from '../redux/actions/actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { leftButtons } from 'navigation'
import { Icon } from 'atoms'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
})

const StyledButton = styled.Button`
  background-color: pink;
  width: 200;
  height: 100;
`

type Props = {}
class App extends Component<Props> {
  constructor(props) {
    super(props)
    // Set menu navigation button
    this.props.navigator.setButtons(leftButtons(this.props.navigator))
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <StyledButton
          id="button"
          onPress={this.props.addToFavourites.bind(null, 'test')}
          title={'add'}
        />
        <Icon />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

const mapStateToProps = state => ({
  favourites: state.favourites.favourites,
})

const mapDispatchToProps = {
  addToFavourites: addToFavourites,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
