import React from 'react'
import { Query } from 'react-apollo'
import {
  READ_ARTIST_ALBUM,
  READ_FAVOURITES,
  READ_WATCHING,
  READ_EBAY_BY_FAVOURITES,
  READ_MARKET_PLACE,
} from '../../graphQL'

export const readArtistAlbum = ({ render, spotifyId }) => (
  <Query query={READ_ARTIST_ALBUM.query} variables={{ id: spotifyId }}>
    {({ loading, error, data }) => render({ loading, error, data })}
  </Query>
)

export const readFavourites = ({ render, userId }) => (
  <Query query={READ_FAVOURITES.query} variables={{ id: userId }}>
    {({ loading, error, data }) => render({ loading, error, data })}
  </Query>
)

export const readWatching = ({ render, userId }) => (
  <Query query={READ_WATCHING.query} variables={{ id: userId }}>
    {({ loading, error, data }) => render({ loading, error, data })}
  </Query>
)

export const readEBayByFavourites = ({ render, userId }) => (
  <Query query={READ_EBAY_BY_FAVOURITES.query} variables={{ id: userId }}>
    {({ loading, error, data, refetch, networkStatus }) =>
      render({ loading, error, data, refetch, networkStatus })
    }
  </Query>
)

export const readMarketPlace = ({ render, artist, album, keywords }) => (
  <Query
    query={READ_MARKET_PLACE.query}
    variables={{ artist, album, keywords }}
  >
    {({ loading, error, data }) => render({ loading, error, data })}
  </Query>
)
