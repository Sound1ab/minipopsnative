// @flow
import React, { Component } from 'react'
import { PushNotificationIOS, Alert } from 'react-native'
import { connect } from 'react-redux'
import { pushScreen } from '../../navigation'
import { LOGIN_MACHINE_ACTIONS } from '../../machines/Login/actions'

type PropTypes = {
  loading: Boolean,
  signOut: Function,
}

class Profile extends Component<PropTypes> {
  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
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
  handlePushMyScreen = ({ navigator, screen }) => {
    pushScreen({
      navigator: navigator,
      screen: screen,
      passProps: {
        loading: this.props.loading,
        user: this.props.user,
        navigator,
      },
    })
  }
  CheckNotificationPermissions = () => {
    PushNotificationIOS.checkPermissions(status => {
      const deniedPermissions = Object.entries(status).filter(
        permission => !permission[1],
      )
      if (deniedPermissions.length === 0) {
        Alert.alert(
          'Notifications',
          'All Notifications are active!',
          [{ text: 'OK' }],
          { cancelable: false },
        )
      } else {
        Alert.alert(
          'Notifications',
          'Some notification settings missing',
          [
            {
              text: 'Activate notifications',
              onPress: () =>
                PushNotificationIOS.requestPermissions(
                  deniedPermissions.map(permission => permission[0]),
                ),
            },
            { text: 'Cancel' },
          ],
          { cancelable: false },
        )
      }
    })
  }
  render() {
    return this.props.children({
      ...this.props,
      handlePushMyScreen: this.handlePushMyScreen,
      CheckNotificationPermissions: this.CheckNotificationPermissions,
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
