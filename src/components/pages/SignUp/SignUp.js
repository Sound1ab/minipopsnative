// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { InputWrapper, Heading } from '../../presentational/atoms'
import { SIGN_UP_MACHINE_ACTIONS } from './actions'
import { colors } from '../../../Theme'
import { FormValidation } from '../../../helpers/formValidation'

import { TouchableOpacity } from 'react-native'

import Amplify, { Auth } from 'aws-amplify'
import config from '../../../../aws-exports'
Amplify.configure(config)

type PropTypes = {}

type StateTypes = {
  username: string,
  password: string,
  phone_number: string,
  email: string,
  validationErrors: Array<string>,
}

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
    form: {
      username: '',
      password: '',
      phone_number: '',
      email: '',
    },
    confirmation: {
      code: '',
    },
    validationErrors: [],
  }
  handleChangeText = (input, value) => {
    this.setState({
      form: {
        ...this.state.form,
        [input]: value,
      },
    })
  }
  handleCodeText = (input, value) => {
    this.setState({
      confirmation: {
        [input]: value,
      },
    })
  }
  validationErrors = data => {
    const formValidation = new FormValidation()
    const validationErrors = formValidation.validate(data)
    this.setState({
      validationErrors,
    })
    return validationErrors.length > 0
  }
  handleSignUp = () => {
    if (this.validationErrors(this.state.form)) {
      return
    }
    this.props.signUp(this.state.form)
  }
  handleConfirmation = () => {
    if (this.validationErrors(this.state.confirmation)) {
      return
    }
    this.props.confirmUser({
      username: this.state.form.username,
      code: this.state.confirmation.code,
    })
  }
  _signUpForm = () => (
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
          value={this.state.form.username}
          marginBottom
          autoFocus
          autoCapitalize="none"
          error={this.state.validationErrors.includes('username')}
          placeholder="username"
        />
        <InputWrapper
          handleChange={this.handleChangeText.bind(null, 'password')}
          value={this.state.form.password}
          marginBottom
          password
          autoCapitalize="none"
          error={this.state.validationErrors.includes('password')}
          placeholder="password"
        />
        <InputWrapper
          handleChange={this.handleChangeText.bind(null, 'phone_number')}
          value={this.state.form.phone_number}
          marginBottom
          autoCapitalize="none"
          error={this.state.validationErrors.includes('phone_number')}
          placeholder="+4412345678987"
          keyboardType="numeric"
        />
        <InputWrapper
          handleChange={this.handleChangeText.bind(null, 'email')}
          value={this.state.form.email}
          placeholder="email@email.com"
          autoCapitalize="none"
          error={this.state.validationErrors.includes('email')}
          keyboardType="email-address"
        />
      </Section>
      <TouchableOpacity onPress={this.handleSignUp}>
        <Heading font="l" color={colors.primary}>
          Sign Up
        </Heading>
      </TouchableOpacity>
    </Wrapper>
  )

  _confirmationForm = () => (
    <Wrapper>
      <Section>
        <Heading font="xl" color={colors.black}>
          Confirmation
        </Heading>
        <Heading font="l" color={colors.gray}>
          Confirm using the code sent via sms
        </Heading>
      </Section>
      <Section>
        <InputWrapper
          handleChange={this.handleCodeText.bind(null, 'code')}
          value={this.state.confirmation.code}
          autoFocus
          autoCapitalize="none"
          error={this.state.validationErrors.includes('code')}
          placeholder="confirmation code"
        />
      </Section>
      <TouchableOpacity onPress={this.handleConfirmation}>
        <Heading font="l" color={colors.primary}>
          Confirm code
        </Heading>
      </TouchableOpacity>
    </Wrapper>
  )

  render() {
    return this.props.signUpState.idle &&
      this.props.signUpState.idle === 'waitingForConfirmation'
      ? this._confirmationForm()
      : this._signUpForm()
  }
}

const mapStateToProps = state => ({
  signUpState: state.signUp.state,
})

const mapDispatchToProps = dispatch => ({
  signUp: form => {
    dispatch(SIGN_UP_MACHINE_ACTIONS.SIGN_UP(form))
  },
  confirmUser: form => {
    dispatch(SIGN_UP_MACHINE_ACTIONS.CONFIRM_USER(form))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp)
