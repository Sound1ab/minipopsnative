// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LOGIN_MACHINE_ACTIONS } from '../../machines/Login/actions'
import { FormValidation } from '../../helpers/index'

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
    return this.props.children({
      ...this.props,
      ...this.state,
      handleChangeText: this.handleChangeText,
      handleCodeText: this.handleCodeText,
      handleSignIn: this.handleSignIn,
      handleConfirmation: this.handleConfirmation,
    })
  }
}

const mapStateToProps = state => ({
  state: state.login.state,
  cognitoUser: state.login.cognitoUser,
})

const mapDispatchToProps = dispatch => ({
  signIn: form => {
    dispatch(LOGIN_MACHINE_ACTIONS.SIGN_IN(form))
  },
  confirmUser: form => {
    dispatch(LOGIN_MACHINE_ACTIONS.CONFIRM_USER(form))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn)