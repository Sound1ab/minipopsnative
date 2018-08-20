// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { popScreen } from '../../navigation'
import { loginMachine } from '../../machines/Login'
import { FormValidation } from '../../helpers/index'

type PropTypes = {
  navigator: Object,
}

type StateTypes = {
  form: {
    currentPassword: string,
    newPassword: string,
  },
  validationErrors: Array<string>,
}

export class ChangePassword extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  state = {
    form: {
      currentPassword: '',
      password: '',
    },
    validationErrors: [],
  }
  validationErrors = data => {
    const formValidation = new FormValidation()
    let validationErrors = formValidation.validate(data)
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
  handleUpdatePassword = () => {
    if (this.validationErrors(this.state.form)) {
      return
    }
    this.props.updatePassword(this.state.form)
    popScreen(this.props.navigator)
  }
  render() {
    return this.props.children({
      ...this.props,
      ...this.state,
      handleChangeText: this.handleChangeText,
      handleUpdatePassword: this.handleUpdatePassword,
    })
  }
}

const mapStateToProps = state => ({
  state: state.login.state,
  loading: state.app.loading,
  user: state.login.cognitoUser,
})

const mapDispatchToProps = () => ({
  updatePassword: payload => {
    loginMachine.dispatchAction('UPDATE_PASSWORD', payload)
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword)
