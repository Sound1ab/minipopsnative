// @flow
import get from 'lodash/get'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { artistReleases } from '../../machines/Discovery/selectors'
import { discoveryMachine } from '../../machines/Discovery'

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

  componentDidMount = () => {
    this.props.fetchArtistReleases({ spotifyId: this.props.spotifyId })
  }

  render() {
    const { loading, state } = this.props
    return this.props.children({
      ...this.props,
      loading:
        loading && get(state, ['artistReleases'], '') === 'fetchingReleases',
    })
  }
}

const mapStateToProps = state => ({
  artistReleases: artistReleases(state),
  state: state.discovery.state,
  loading: state.app.loading,
})

const mapDispatchToProps = () => ({
  fetchArtistReleases: payload => {
    discoveryMachine.dispatchAction('FETCH_RELEASES', payload)
  },
  fetchMoreArtistReleases: payload => {
    discoveryMachine.dispatchAction('FETCH_MORE_RELEASES', payload)
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistReleases)
