// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginMachine } from '../../machines/Login'
import { FormValidation } from '../../helpers/index'

type PropTypes = {
  navigator: Object,
}

type StateTypes = {
  form: {
    phone_number: string,
    email: string,
  },
  validationErrors: Array<string>,
}

export class MyDetails extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  state = {
    form: {
      phone_number: '',
      email: '',
    },
    validationErrors: [],
  }
  componentDidMount = () => {
    this.setState({
      form: {
        phone_number: this.props.user.attributes.phone_number,
        email: this.props.user.attributes.email,
      },
    })
  }
  validationErrors = data => {
    const formValidation = new FormValidation()
    let validationErrors = formValidation.validate(data)
    if (
      this.state.form.email === this.props.user.attributes.email &&
      this.state.form.phone_number === this.props.user.attributes.phone_number
    ) {
      validationErrors = ['email', 'phone_number']
    }
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
  handleSaveUserAttributes = () => {
    if (this.validationErrors(this.state.form)) {
      return
    }
    this.props.updateUserAttributes({
      form: this.state.form,
      user: this.props.user,
    })
  }
  render() {
    return this.props.children({
      ...this.props,
      ...this.state,
      handleChangeText: this.handleChangeText,
      handleSaveUserAttributes: this.handleSaveUserAttributes,
    })
  }
}

const mapStateToProps = state => ({
  state: state.login.state,
  loading: state.app.loading,
  user: state.login.cognitoUser,
})

const mapDispatchToProps = () => ({
  updateUserAttributes: payload => {
    loginMachine.dispatchAction('UPDATE_USER_ATTRIBUTES', payload)
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyDetails)
