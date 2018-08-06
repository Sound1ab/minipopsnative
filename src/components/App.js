// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GrowContainer, Spinner, NavBar, Heading } from './presentational/atoms'
import { SearchField } from './container'
import {
  SignIn,
  SignUp,
  Favourites,
  Discovery,
  Feed,
  Search,
  Profile,
} from './pages'
import { popScreen } from '../navigation'

type PropTypes = {
  // loading: Boolean,
}

type StateTypes = {}

export class App extends Component<PropTypes, StateTypes> {
  static defaultProps = {
    // loading: false,
  }
  constructor(props: PropTypes) {
    super(props)
  }
  state = {}

  components = {
    SignIn,
    SignUp,
    Favourites,
    Discovery,
    Feed,
    Search,
    Profile,
  }

  popScreenWrapper = fn => {
    const validOn = ['ArtistAlbum', 'ArtistReleases']
  }

  render() {
    const Component = this.components[this.props.screen]
    return (
      <GrowContainer>
        <Spinner isVisible={this.props.loading} />
        <Component navigator={this.props.navigator} />
      </GrowContainer>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
})

export default connect(mapStateToProps)(App)
