// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchResults } from '../../machines/SearchField/selectors'

type PropTypes = {
  loading: Boolean,
  searchResults: Array<Object>,
}

class Search extends Component<PropTypes> {
  render() {
    return this.props.children(this.props)
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  searchResults: searchResults(state),
})

export default connect(mapStateToProps)(Search)
