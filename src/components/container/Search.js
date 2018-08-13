// @flow
import React from 'react'
import { connect } from 'react-redux'
import { searchResults } from '../../machines/SearchField/selectors'

type PropTypes = {
  loading: Boolean,
  searchResults: Array<Object>,
}

const Search = (props: PropTypes) => props.children(props)

const mapStateToProps = state => ({
  loading: state.app.loading,
  searchResults: searchResults(state),
})

export default connect(mapStateToProps)(Search)
