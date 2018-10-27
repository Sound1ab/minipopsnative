import gql from 'graphql-tag'

export const CREATE_FAVOURITES = {
  definition: 'createFavourites',
  mutation: gql`
    mutation CreateFavourites($id: ID!) {
      createFavourites(id: $id) {
        id
      }
    }
  `,
}

export const READ_FAVOURITES = {
  definition: 'readFavourites',
  query: gql`
    query ReadFavourites($id: ID!) {
      readFavourites(id: $id) {
        id
        favourites {
          artist
          album
          imageBigUrl
          imageMediumUrl
          imageSmallUrl
          spotifyId
          popularity
          tracks
        }
      }
    }
  `,
}

export const UPDATE_FAVOURITES = {
  definition: 'updateFavourites',
  mutation: gql`
    mutation UpdateFavourites($id: ID!, $favourite: InputFavourite!) {
      updateFavourites(id: $id, favourite: $favourite) {
        id
        favourites {
          artist
          album
          imageBigUrl
          imageMediumUrl
          imageSmallUrl
          spotifyId
          popularity
          tracks
        }
      }
    }
  `,
}

export const DELETE_FAVOURITES = {
  definition: 'deleteFavourites',
  mutation: gql`
    mutation DeleteFavourites($id: ID!, $favouriteId: ID!) {
      deleteFavourites(id: $id, favouriteId: $favouriteId) {
        id
        favourites {
          artist
          album
          imageBigUrl
          imageMediumUrl
          imageSmallUrl
          spotifyId
          popularity
          tracks
        }
      }
    }
  `,
}
