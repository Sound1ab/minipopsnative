// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUpMachine } from '../../machines/SignUp'
import { FormValidation } from '../../helpers/index'

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
    return this.props.children({
      ...this.state,
      ...this.props,
      handleChangeText: this.handleChangeText,
      handleCodeText: this.handleCodeText,
      handleSignUp: this.handleSignUp,
      handleConfirmation: this.handleConfirmation,
    })
  }
}

const mapStateToProps = state => ({
  state: state.signUp.state,
  loading: state.app.loading,
})

const mapDispatchToProps = () => ({
  signUp: form => {
    signUpMachine.dispatchAction('SIGN_UP', form)
  },
  confirmUser: form => {
    signUpMachine.dispatchAction('CONFIRM_USER', form)
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp)
