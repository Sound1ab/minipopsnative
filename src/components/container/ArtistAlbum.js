// @flow
import { adopt } from 'react-adopt'
import { READ_ARTIST_ALBUM, READ_FAVOURITES } from '../../graphQL'
import {
  readArtistAlbum,
  readFavourites,
  updateFavourites,
  deleteFavourites,
} from '../apollo'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ArtistAlbumSkeleton } from '../presentational/zkeletons'
import { LayoutAnimation } from 'react-native'

const ComposedQueries = adopt({
  readFavourites,
  readArtistAlbum,
  updateFavourites,
  deleteFavourites,
})

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
  didAppear: boolean,
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
    loading: false,
    children: () => {},
  }

  render() {
    return (
      <ComposedQueries spotifyId={this.props.spotifyId} userId={this.props.id}>
        {({
          readFavourites: { favourites },
          readArtistAlbum: { artistAlbum, loading },
          updateFavourites: { updateFavourites },
          deleteFavourites: { deleteFavourites },
        }) => {
          if (loading) {
            return <ArtistAlbumSkeleton />
          }

          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

          return this.props.children({
            ...this.props,
            artistAlbum,
            updateFavourites,
            deleteFavourites,
            favourites,
          })
        }}
      </ComposedQueries>
    )
  }
}

const mapStateToProps = state => ({
  id: state.login.cognitoUser.id,
})

export default connect(mapStateToProps)(ArtistAlbum)
