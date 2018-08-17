// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchResults } from '../../machines/SearchField/selectors'

type PropTypes = {
  loading: Boolean,
  searchResults: Array<Object>,
}

class Search extends Component<PropTypes> {
  constructor(props) {
    super(props)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
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
  render() {
    return this.props.children(this.props)
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  searchResults: searchResults(state),
})

export default connect(mapStateToProps)(Search)
