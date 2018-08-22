// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  searchValue,
  searchResults,
} from '../../machines/SearchField/selectors'
import { searchMachine } from '../../machines/SearchField'

type PropTypes = {
  state: string | Object,
  loading: boolean,
  searchValue: string,
  searchResults: Array<Object>,
}

class Search extends Component<PropTypes> {
  render() {
    return this.props.children(this.props)
  }
}

const mapStateToProps = state => ({
  state: state.search.state,
  loading: state.app.loading,
  searchValue: searchValue(state),
  searchResults: searchResults(state),
})

const mapDispatchToProps = () => ({
  searchInput: payload => {
    searchMachine.dispatchAction('TEXT_INPUT', payload)
  },
  searchEmpty: () => {
    searchMachine.dispatchAction('TEXT_INPUT_EMPTY', { value: null })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search)
