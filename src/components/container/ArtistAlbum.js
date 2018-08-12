// @flow
import React from 'react'
import { connect } from 'react-redux'
import { FAVOURITES_MACHINE_ACTIONS } from '../../machines/Discovery/actions'
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
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  loading: false,
  children: () => {},
}

const mapStateToProps = state => ({
  artistAlbum: artistAlbum(state),
  favourites: favourites(state),
  id: state.login.cognitoUser.id,
  state: state.discovery.state,
  loading: state.app.loading,
})

const mapDispatchToProps = dispatch => ({
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
)(ArtistAlbum)
