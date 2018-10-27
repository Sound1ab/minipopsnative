import React from 'react'
import { Mutation } from 'react-apollo'
import {
  UPDATE_FAVOURITES,
  DELETE_FAVOURITES,
  UPDATE_WATCHING,
  DELETE_WATCHING,
} from '../../graphQL'

export const updateFavourites = ({ render }) => (
  <Mutation mutation={UPDATE_FAVOURITES.mutation}>
    {(updateFavourites, { loading, error, data }) =>
      render({ updateFavourites, loading, error, data })
    }
  </Mutation>
)

export const deleteFavourites = ({ render }) => (
  <Mutation mutation={DELETE_FAVOURITES.mutation}>
    {(deleteFavourites, { loading, error, data }) =>
      render({ deleteFavourites, loading, error, data })
    }
  </Mutation>
)

export const updateWatching = ({ render }) => (
  <Mutation mutation={UPDATE_WATCHING.mutation}>
    {(updateWatching, { loading, error, data }) =>
      render({ updateWatching, loading, error, data })
    }
  </Mutation>
)

export const deleteWatching = ({ render }) => (
  <Mutation mutation={DELETE_WATCHING.mutation}>
    {(deleteWatching, { loading, error, data }) =>
      render({ deleteWatching, loading, error, data })
    }
  </Mutation>
)
