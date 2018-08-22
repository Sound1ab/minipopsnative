// @flow
import React, { Component } from 'react'
import { Functional } from '../../helpers'
import { connect } from 'react-redux'
import { pushScreen } from '../../navigation'
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
  static defaultProps = {
    loading: false,
    discoveryResults: [],
  }
  // TODO: Pass these down directly as props from connect
  fetchArtistAlbum = item => {
    this.props.fetchArtistAlbum({ spotifyId: item.spotifyId })
    return item
  }
  fetchArtistReleases = item => {
    this.props.fetchArtistReleases({ spotifyId: item.spotifyId })
    return item
  }
  fetchMoreArtistReleases = item => {
    this.props.fetchMoreArtistReleases({ spotifyId: item.spotifyId })
    return item
  }
  handlePushArtistAlbum = ({ spotifyId, title, navigator }) => {
    pushScreen({
      navigator: navigator,
      screen: 'ArtistAlbum',
      passProps: {
        albumSpotifyId: spotifyId,
        title,
        addToFavourites: this.props.addToFavourites,
        removeFromFavourites: this.props.removeFromFavourites,
      },
    })
  }
  handlePushArtistReleases = ({ spotifyId, title, navigator }) => {
    pushScreen({
      navigator: navigator,
      screen: 'ArtistReleases',
      passProps: {
        artistSpotifyId: spotifyId,
        title,
        fetchMoreArtistReleases: this.fetchMoreArtistReleases,
        handlePushArtistAlbum: Functional.compose(
          this.handlePushArtistAlbum,
          this.fetchArtistAlbum,
        ),
      },
    })
  }
  render() {
    return this.props.children({
      ...this.props,
      handlePushArtistReleases: this.handlePushArtistReleases,
      fetchArtistReleases: this.fetchArtistReleases,
    })
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  searchValue: searchValue(state),
  searchResults: searchResults(state),
})

const mapDispatchToProps = () => ({
  fetchArtistReleases: spotifyId => {
    discoveryMachine.dispatchAction('FETCH_RELEASES', spotifyId)
  },
  fetchMoreArtistReleases: spotifyId => {
    discoveryMachine.dispatchAction('FETCH_MORE_RELEASES', spotifyId)
  },
  fetchArtistAlbum: payload => {
    discoveryMachine.dispatchAction('FETCH_ALBUM', payload)
  },
  addToFavourites: payload => {
    discoveryMachine.dispatchAction('ADD_FAVOURITE', payload)
  },
  removeFromFavourites: payload => {
    discoveryMachine.dispatchAction('REMOVE_FAVOURITE', payload)
  },
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
