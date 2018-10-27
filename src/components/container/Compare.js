// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { adopt } from 'react-adopt'
import { READ_FAVOURITES, READ_WATCHING } from '../../graphQL'
import {
  readFavourites,
  updateFavourites,
  deleteFavourites,
  readWatching,
  deleteWatching,
  updateWatching,
  readMarketPlace,
} from '../apollo'
import { LayoutAnimation } from 'react-native'

const ComposedQueries = adopt({
  readFavourites,
  updateFavourites,
  deleteFavourites,
  readWatching,
  updateWatching,
  deleteWatching,
  readMarketPlace,
})

type PropTypes = {
  loading: Boolean,
  artist: string,
  album: string,
}

class Compare extends Component<PropTypes> {
  render() {
    const { artist, album } = this.props
    return (
      <ComposedQueries
        userId={this.props.id}
        artist={artist}
        album={album}
        keywords={`${artist} ${album}`}
      >
        {({
          readFavourites: { favourites },
          readWatching: { watching },
          readMarketPlace: {
            junoProducts,
            discogsMarketPlaceProducts,
            vinylTapProducts,
            eBayProducts,
            loading,
          },
          updateFavourites: { updateFavourites },
          updateWatching: { updateWatching },
          deleteWatching: { deleteWatching },
          deleteFavourites: { deleteFavourites },
        }) => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

          return this.props.children({
            ...this.props,
            favourites,
            watching,
            updateFavourites,
            updateWatching,
            deleteWatching,
            deleteFavourites,
            junoProducts,
            discogsMarketPlaceProducts,
            vinylTapProducts,
            eBayProducts,
            loading,
          })
        }}
      </ComposedQueries>
    )
  }
}

const mapStateToProps = state => ({
  id: state.login.cognitoUser.id,
})

export default connect(mapStateToProps)(Compare)
