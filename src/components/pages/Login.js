// @flow
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import SignUp from '../container/SignUp'
import SignIn from '../container/SignIn'
import { GrowContainer, Spinner } from '../presentational/atoms'

type PropTypes = {
  navigator: Object,
}

type StateTypes = {}

class Login extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  constructor(props: PropTypes) {
    super(props)
  }
  state = {}

  signUp = () => <SignUp navigator={this.props.navigator} />

  signIn = () => <SignIn navigator={this.props.navigator} />

  render() {
    return (
      <GrowContainer>
        <Spinner isVisible={this.props.loading} />
        {this[this.props.form]()}
      </GrowContainer>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
})

export default connect(mapStateToProps)(Login)
