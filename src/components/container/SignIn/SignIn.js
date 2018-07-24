// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SIGN_IN_MACHINE_ACTIONS } from './actions'
import { FormValidation } from '../../../helpers/formValidation'
import { SignInForm, SignInConfirmation } from '../../presentational/organisms'

type PropTypes = {
  navigator: Object,
}

type StateTypes = {
  form: {
    username: string,
    password: string,
    phone_number: string,
    email: string,
  },
  confirmation: {
    code: string,
  },
  validationErrors: Array<string>,
}

export class SignIn extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  state = {
    form: {
      username: '',
      password: '',
    },
    confirmation: {
      code: '',
    },
    validationErrors: [],
  }
  validationErrors = data => {
    const formValidation = new FormValidation()
    const validationErrors = formValidation.validate(data)
    this.setState({
      validationErrors,
    })
    return validationErrors.length > 0
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
  handleSignIn = () => {
    if (this.validationErrors(this.state.form)) {
      return
    }
    this.props.signIn(this.state.form)
  }
  handleConfirmation = () => {
    if (this.validationErrors(this.state.confirmation)) {
      return
    }
    this.props.confirmUser({
      cognitoUser: this.props.cognitoUser,
      code: this.state.confirmation.code,
      navigator: this.props.navigator,
    })
  }
  render() {
    const { username, password } = this.state.form
    return this.props.signInState.idle &&
      this.props.signInState.idle === 'waitingForConfirmation' ? (
      <SignInConfirmation
        code={this.state.confirmation.code}
        validationErrors={this.state.validationErrors}
        handleChangeText={this.handleCodeText}
        handleSubmit={this.handleConfirmation}
      />
    ) : (
      <SignInForm
        username={username}
        password={password}
        validationErrors={this.state.validationErrors}
        handleChangeText={this.handleChangeText}
        handleSubmit={this.handleSignIn}
      />
    )
  }
}

const mapStateToProps = state => ({
  signInState: state.signIn.state,
  cognitoUser: state.signIn.cognitoUser,
})

const mapDispatchToProps = dispatch => ({
  signIn: form => {
    dispatch(SIGN_IN_MACHINE_ACTIONS.SIGN_IN(form))
  },
  confirmUser: form => {
    dispatch(SIGN_IN_MACHINE_ACTIONS.CONFIRM_USER(form))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn)
