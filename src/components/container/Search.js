// @flow
import React from 'react'
import { connect } from 'react-redux'

type PropTypes = {
  loading: Boolean,
  searchResults: Array<Object>,
}

const Search = (props: PropTypes) => props.children(props)

const mapStateToProps = state => ({
  loading: state.app.loading,
  searchResults: state.search.searchResults,
})

export default connect(mapStateToProps)(Search)
