import React from 'react'
import { Query } from 'react-apollo'
import {
  READ_ARTIST_ALBUM,
  READ_FAVOURITES,
  READ_WATCHING,
  READ_EBAY_BY_FAVOURITES,
  READ_MARKET_PLACE,
} from '../../graphQL'

const artistAlbumDefault = {
  artist: '',
  album: '',
  tracks: [],
  imageBigUrl: '',
  imageMediumUrl: '',
  imageSmallUrl: '',
  spotifyId: '',
  popularity: 0,
}

export const readArtistAlbum = ({ render, spotifyId }) => (
  <Query query={READ_ARTIST_ALBUM.query} variables={{ id: spotifyId }}>
    {({ loading, error, data }) => {
      const artistAlbum =
        (data && data[READ_ARTIST_ALBUM.definition]) || artistAlbumDefault
      return render({ loading, error, artistAlbum })
    }}
  </Query>
)

export const readFavourites = ({ render, userId }) => (
  <Query query={READ_FAVOURITES.query} variables={{ id: userId }}>
    {({ loading, error, data }) => {
      const favourites =
        (data &&
          data[READ_FAVOURITES.definition] &&
          data[READ_FAVOURITES.definition].favourites) ||
        []
      return render({ loading, error, favourites })
    }}
  </Query>
)

export const readWatching = ({ render, userId }) => (
  <Query query={READ_WATCHING.query} variables={{ id: userId }}>
    {({ loading, error, data }) => {
      const watching =
        (data &&
          data[READ_WATCHING.definition] &&
          data[READ_WATCHING.definition].watching) ||
        []
      return render({ loading, error, watching })
    }}
  </Query>
)

export const readEBayByFavourites = ({ render, userId }) => (
  <Query query={READ_EBAY_BY_FAVOURITES.query} variables={{ id: userId }}>
    {({ loading, error, data, refetch, networkStatus }) => {
      const feed = (data && data[READ_EBAY_BY_FAVOURITES.definition]) || []
      return render({ loading, error, feed, refetch, networkStatus })
    }}
  </Query>
)

export const readMarketPlace = ({ render, artist, album, keywords }) => (
  <Query
    query={READ_MARKET_PLACE.query}
    variables={{ artist, album, keywords }}
  >
    {({ loading, error, data }) => {
      const junoProducts = (data && data.juno) || []
      const discogsMarketPlaceProducts = (data && data.discogsMarket) || []
      const vinylTapProducts = (data && data.vinylTap) || []
      const eBay = (data && data.eBay) || []
      const eBayProducts = eBay.map(item => ({
        price: item.price,
        title: item.title,
        image: item.imageUrl[0],
        link: item.itemUrl,
      }))

      return render({
        loading,
        error,
        junoProducts,
        discogsMarketPlaceProducts,
        vinylTapProducts,
        eBayProducts,
      })
    }}
  </Query>
)
