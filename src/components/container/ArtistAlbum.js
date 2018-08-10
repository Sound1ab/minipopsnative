// @flow
import React from 'react'
import { connect } from 'react-redux'

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
  albumSpotifyId: string,
  addToFavourites: Function,
  removeFromFavourites: Function,
  loading: Boolean,
  children: Function,
}

const ArtistAlbum = (props: PropTypes) => props.children(props)

ArtistAlbum.defaultProps = {
  artistAlbum: {
    artist: '',
    name: '',
    tracks: [],
    imageUrl: '',
    spotifyId: '',
  },
  favourites: [],
  id: '',
  albumSpotifyId: '',
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  loading: false,
  children: () => {},
}

const mapStateToProps = state => ({
  artistAlbum: state.discovery.artistAlbum,
  favourites: state.discovery.favourites,
  id: state.login.cognitoUser.id,
  state: state.discovery.state,
  loading: state.app.loading,
})

export default connect(mapStateToProps)(ArtistAlbum)
