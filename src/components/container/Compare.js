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
          readFavourites: { data: favouritesData, loading: favouritesLoading },
          readWatching: { data: watchingData, loading: watchingLoading },
          readMarketPlace: {
            data: marketPlaceData,
            loading: marketPlaceLoading,
          },
          updateFavourites: { updateFavourites },
          updateWatching: { updateWatching },
          deleteWatching: { deleteWatching },
          deleteFavourites: { deleteFavourites },
        }) => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

          const favourites =
            (favouritesData &&
              favouritesData[READ_FAVOURITES.definition] &&
              favouritesData[READ_FAVOURITES.definition].favourites) ||
            []
          const watching =
            (watchingData &&
              watchingData[READ_WATCHING.definition] &&
              watchingData[READ_WATCHING.definition].watching) ||
            []
          const junoProducts = (marketPlaceData && marketPlaceData.juno) || []
          const discogsMarketPlaceProducts =
            (marketPlaceData && marketPlaceData.discogsMarket) || []
          const vinylTapProducts =
            (marketPlaceData && marketPlaceData.vinylTap) || []
          const eBay = (marketPlaceData && marketPlaceData.eBay) || []

          const eBayProducts = eBay.map(item => ({
            price: item.price,
            title: item.title,
            image: item.imageUrl[0],
            link: item.itemUrl,
          }))

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
            marketPlaceLoading,
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
