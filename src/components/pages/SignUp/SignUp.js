// @flow
import React, { Component } from 'react'
import {
  GrowContainer,
  Icon,
  InputWrapper,
  Heading,
} from '../../presentational/atoms'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { SIGN_UP_MACHINE_ACTIONS } from './actions'
import { colors } from '../../../Theme'

import {
  // ..existing imports commented out
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import Amplify, { Auth } from 'aws-amplify'
import config from '../../../../aws-exports'
Amplify.configure(config)

const Text = styled.Text``

type PropTypes = {}

type StateTypes = {
  username: string,
  password: string,
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

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
`

const Section = styled.View`
  margin-bottom: 32px;
  width: 100%;
`

export class SignUp extends Component<PropTypes, StateTypes> {
  static defaultProps = {}

  state = {
    username: '',
    password: '',
    phone_number: '',
    email: '',
  }
  handleChangeText = (input, value) => {
    this.setState({
      ...this.state,
      [input]: value,
    })
  }
  handleSignUp = () => {
    this.props.signUp(this.state)
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
    const { username, password, phone_number, email } = this.state
    return (
      <Wrapper>
        <Section>
          <Heading font="xl" color={colors.black}>
            Welcome
          </Heading>
          <Heading font="l" color={colors.gray}>
            Sign up to continue
          </Heading>
        </Section>
        <Section>
          <InputWrapper
            handleChange={this.handleChangeText.bind(null, 'username')}
            value={username}
            marginBottom
            autoFocus
            placeholder="Username"
          />
          <InputWrapper
            handleChange={this.handleChangeText.bind(null, 'password')}
            value={password}
            marginBottom
            placeholder="Password"
          />
          <InputWrapper
            handleChange={this.handleChangeText.bind(null, 'phone_number')}
            value={phone_number}
            marginBottom
            placeholder="Phone Number"
          />
          <InputWrapper
            handleChange={this.handleChangeText.bind(null, 'email')}
            value={email}
            placeholder="Email"
          />
        </Section>
        <TouchableOpacity onPress={this.handleSignUp}>
          <Heading font="l" color={colors.primary}>
            Sign Up
          </Heading>
        </TouchableOpacity>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  signUp: form => {
    dispatch(SIGN_UP_MACHINE_ACTIONS.SIGN_UP(form))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp)
