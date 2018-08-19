// @flow
import React, { Component } from 'react'
import { Functional } from '../../helpers'
import { connect } from 'react-redux'
import { pushScreen } from '../../navigation'
import { discoveryMachine } from '../../machines/Discovery'
import { discoveryResults } from '../../machines/SearchField/selectors'

type PropTypes = {
  loading: Boolean,
  discoveryResults: Array<Object>,
}

class Discovery extends Component<PropTypes> {
  static defaultProps = {
    loading: false,
    discoveryResults: [],
  }
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
  discoveryResults: discoveryResults(state),
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Discovery)
