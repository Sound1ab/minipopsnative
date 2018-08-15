// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushScreen } from '../../navigation'
import { LOGIN_MACHINE_ACTIONS } from '../../machines/Login/actions'

type PropTypes = {
  loading: Boolean,
  signOut: Function,
}

class Profile extends Component<PropTypes> {
  handlePushMyDetails = ({ navigator }) => {
    pushScreen({
      navigator: navigator,
      screen: 'MyDetails',
      passProps: {
        loading: this.props.loading,
        user: this.props.user,
        navigator,
      },
    })
  }
  render() {
    return this.props.children({
      ...this.props,
      handlePushMyDetails: this.handlePushMyDetails,
    })
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  user: state.login.cognitoUser,
})

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(LOGIN_MACHINE_ACTIONS.SIGN_OUT())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile)
