// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GrowContainer, Spinner } from './presentational/atoms'
import {
  SignIn,
  SignUp,
  Favourites,
  Discovery,
  Feed,
  Search,
  Profile,
} from './presentational/pages'
import { LocalNotificationManager } from './container'

type PropTypes = {
  loading: Boolean,
}

export class App extends Component<PropTypes> {
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
        <Component
          navigator={this.props.navigator}
          loading={this.props.loading}
        />
        <LocalNotificationManager />
      </GrowContainer>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
})

export default connect(mapStateToProps)(App)
