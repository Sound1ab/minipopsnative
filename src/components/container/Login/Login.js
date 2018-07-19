// @flow
import React, { Component } from 'react'
import { GrowContainer, Icon } from '../../presentational/atoms'
import styled from 'styled-components'
import { connect } from 'react-redux'

import {
  // ..existing imports commented out
  View,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native'

import Amplify, { Auth } from 'aws-amplify'
import config from '../../../../aws-exports'
Amplify.configure(config)

const Text = styled.Text``

type PropTypes = {
  handleChange: Function,
  value: string,
  api: string,
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: '#ededed',
    marginVertical: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
})

export class Login extends Component<PropTypes> {
  static defaultProps = {}

  constructor(props) {
    super(props)
  }

  state = {
    // 1
    authCode: '',
  }
  onChangeText = authCode => {
    // 2
    this.setState({ authCode })
  }
  signUp() {
    Auth.signUp({
      // 3
      username: 'myCoolUsername',
      password: 'MyCoolP@ssword2!',
      attributes: {
        phone_number: '+447854977339',
        email: 'yourcoolemail@gmail.com',
      },
    })
      .then(res => {
        console.log('successful signup: ', res)
      })
      .catch(err => {
        console.log('error signing up: ', err)
      })
  }
  confirmUser() {
    // 4
    const { authCode } = this.state
    Auth.confirmSignUp('myCoolUsername', authCode)
      .then(res => {
        console.log('successful confirmation: ', res)
      })
      .catch(err => {
        console.log('error confirming user: ', err)
      })
  }

  render() {
    return (
      <GrowContainer>
        <View style={styles.container}>
          <Button title="Sign Up" onPress={this.signUp.bind(this)} />
          <TextInput
            placeholder="Input Code"
            onChangeText={value => this.onChangeText(value)}
            style={styles.input}
          />
          <Button title="Confirm User" onPress={this.confirmUser.bind(this)} />
        </View>
      </GrowContainer>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
