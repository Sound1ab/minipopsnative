// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GrowContainer, Spinner } from './presentational/atoms'
import { NativeEventSubscription } from '../helpers'
import {
  SignIn,
  SignUp,
  Favourites,
  Discovery,
  Feed,
  Search,
  Profile,
} from './pages'
import { LocalNotificationManager } from './container'

type PropTypes = {
  loading: Boolean,
}

export class App extends Component<PropTypes> {
  constructor(props) {
    super(props)
    this.setupLocalNotificationListenerForActiveTab()
  }

  setupLocalNotificationListenerForActiveTab = () => {
    NativeEventSubscription.subscribe(selectedTabIndex => {
      if (this.props.tabIndex === selectedTabIndex) {
        console.log('selectedTabIndex', selectedTabIndex)
        // Aws.setupPushNotificationListeners((e) => console.log(e))
      } else {
        // Aws.removePushNotificationListeners()
      }
    })
  }

  components = {
    SignIn,
    SignUp,
    Favourites,
    Discovery,
    Feed,
    Search,
    Profile,
  }

  render() {
    const Component = this.components[this.props.screen]
    return (
      <GrowContainer>
        <Spinner isVisible={this.props.loading} />
        <Component navigator={this.props.navigator} />
        <LocalNotificationManager />
      </GrowContainer>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
})

export default connect(mapStateToProps)(App)
