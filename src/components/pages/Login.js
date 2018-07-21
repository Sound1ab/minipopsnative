// @flow
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import SignUp from '../container/SignUp'
import SignIn from '../container/SignIn'

type PropTypes = {
  navigator: Object,
}

type StateTypes = {}

export class Login extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  constructor(props: PropTypes) {
    super(props)
  }
  state = {}

  signUp = () => <SignUp navigator={this.props.navigator} />

  signIn = () => <SignIn navigator={this.props.navigator} />

  render() {
    return this[this.props.form]()
  }
}
