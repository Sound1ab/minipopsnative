// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SIGN_UP_MACHINE_ACTIONS } from '../../machines/SignUp/actions'
import { FormValidation } from '../../helpers/index'
import {
  SignUpForm,
  SignUpConfirmation,
} from '../presentational/organisms/index'

type PropTypes = {
  navigator: Object,
}

type StateTypes = {
  username: string,
  password: string,
  phone_number: string,
  email: string,
  validationErrors: Array<string>,
}

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
      navigator: this.props.navigator,
    })
  }

  render() {
    const { username, password, phone_number, email } = this.state.form
    const { code } = this.state.confirmation
    return this.props.signUpState === 'confirmingUser' ||
      (this.props.signUpState.idle &&
        this.props.signUpState.idle === 'waitingForConfirmation') ? (
      <SignUpConfirmation
        code={code}
        validationErrors={this.state.validationErrors}
        handleChangeText={this.handleCodeText}
        handleSubmit={this.handleConfirmation}
      />
    ) : (
      <SignUpForm
        username={username}
        password={password}
        phone_number={phone_number}
        email={email}
        validationErrors={this.state.validationErrors}
        handleChangeText={this.handleChangeText}
        handleSubmit={this.handleSignUp}
      />
    )
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
