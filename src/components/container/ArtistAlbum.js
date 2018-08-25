// @flow
import get from 'lodash/get'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { discoveryMachine } from '../../machines/Discovery'
import { artistAlbum, favourites } from '../../machines/Discovery/selectors'

type PropTypes = {
  artistAlbum: {
    artist: string,
    name: string,
    tracks: Array<string>,
    imageUrl: string,
    spotifyId: string,
  },
  favourites: Array<Object>,
  id: string,
  addToFavourites: Function,
  removeFromFavourites: Function,
  loading: Boolean,
  children: Function,
}

class ArtistAlbum extends Component<PropTypes> {
  static defaultProps = {
    artistAlbum: {
      artist: '',
      name: '',
      tracks: [],
      imageUrl: '',
      spotifyId: '',
    },
    favourites: [],
    id: '',
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    loading: false,
    children: () => {},
  }

  componentDidMount = () => {
    this.props.fetchArtistAlbum({ spotifyId: this.props.spotifyId })
  }

  render() {
    const { loading, state } = this.props
    return this.props.children({
      ...this.props,
      loading: loading && get(state, ['artistAlbum'], '') === 'fetchingAlbum',
    })
  }
}

const mapStateToProps = state => ({
  artistAlbum: artistAlbum(state),
  favourites: favourites(state),
  id: state.login.cognitoUser.id,
  state: state.discovery.state,
  loading: state.app.loading,
})

const mapDispatchToProps = () => ({
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
)(ArtistAlbum)
