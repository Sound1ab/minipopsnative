// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { artistReleases } from '../../machines/Discovery/selectors'

type PropTypes = {
  artistReleases: Object,
  state: string | Object,
  loading: Boolean,
}

class ArtistReleases extends Component<PropTypes> {
  static defaultProps = {
    artistReleases: [],
    state: '',
    loading: false,
  }
  constructor(props) {
    super(props)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    this.isVisible = true
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
  artistReleases: artistReleases(state),
  state: state.discovery.state,
  loading: state.app.loading,
})

export default connect(mapStateToProps)(ArtistReleases)
