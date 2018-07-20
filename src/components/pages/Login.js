// @flow
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import SignUp from '../container/SignUp/SignUp'

type PropTypes = {}

type StateTypes = {}

export class Login extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  constructor(props: PropTypes) {
    super(props)
  }
  state = {}

  signUp = () => <SignUp />

  signIn = () => (
    <View>
      <Text>sign in page</Text>
    </View>
  )

  render() {
    return this[this.props.form]()
  }
}
