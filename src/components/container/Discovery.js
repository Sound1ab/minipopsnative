// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  discoveryMachine,
  searchResults,
  searchValue,
} from '../../machines/Discovery'

type PropTypes = {
  loading: Boolean,
  discoveryResults: Array<Object>,
}

class Discovery extends Component<PropTypes> {
  render() {
    return this.props.children(this.props)
  }
}

const mapStateToProps = state => ({
  state: state.discovery.state,
  loading: state.app.loading,
  searchValue: searchValue(state),
  searchResults: searchResults(state),
})

const mapDispatchToProps = () => ({
  searchInput: payload => {
    discoveryMachine.dispatchAction('TEXT_INPUT', payload)
  },
  searchEmpty: () => {
    discoveryMachine.dispatchAction('TEXT_INPUT_EMPTY', { value: null })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Discovery)
