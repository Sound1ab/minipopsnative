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
    currentPassword: string,
    newPassword: string,
  },
  validationErrors: Array<string>,
}

export class ChangePassword extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  constructor(props) {
    super(props)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    this.isVisible = false
  }
  onNavigatorEvent = event => {
    switch (event.id) {
      case 'willAppear':
        this.isVisible = true
        break
      case 'didAppear':
        this.forceUpdate()
        break
      case 'didDisappear':
        this.isVisible = false
        break
    }
  }
  shouldComponentUpdate = () => {
    return this.isVisible
  }
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

const mapDispatchToProps = dispatch => ({
  updatePassword: payload => {
    dispatch(LOGIN_MACHINE_ACTIONS.UPDATE_PASSWORD(payload))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword)
