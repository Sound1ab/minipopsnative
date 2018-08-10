// @flow
import React, { Component } from 'react'
import { Functional } from '../../helpers/functional'
import { connect } from 'react-redux'
import { pushScreen } from '../../navigation'
import { FAVOURITES_MACHINE_ACTIONS } from '../../machines/Discovery/actions'

type PropTypes = {
  discoveryResults: Array<Object>,
}

class Discovery extends Component<PropTypes> {
  static defaultProps = {
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
        navigator: navigator,
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
  discoveryResults: state.search.discoveryResults,
  artistReleases: state.discovery.artistReleases,
})

const mapDispatchToProps = dispatch => ({
  fetchArtistReleases: spotifyId => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.FETCH_RELEASES(spotifyId))
  },
  fetchMoreArtistReleases: spotifyId => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.FETCH_MORE_RELEASES(spotifyId))
  },
  fetchArtistAlbum: payload => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.FETCH_ALBUM(payload))
  },
  addToFavourites: payload => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.ADD_FAVOURITE(payload))
  },
  removeFromFavourites: payload => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.REMOVE_FAVOURITE(payload))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Discovery)
