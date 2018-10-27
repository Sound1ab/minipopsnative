import gql from 'graphql-tag'

export const CREATE_WATCHING = {
  definition: 'createWatching',
  mutation: gql`
    mutation CreateWatching($id: ID!) {
      createWatching(id: $id) {
        id
      }
    }
  `,
}

export const READ_WATCHING = {
  definition: 'readWatching',
  query: gql`
    query ReadWatching($id: ID!) {
      readWatching(id: $id) {
        id
        watching {
          artist
          album
          spotifyId
        }
      }
    }
  `,
}

export const UPDATE_WATCHING = {
  definition: 'updateWatching',
  mutation: gql`
    mutation UpdateWatching($id: ID!, $watching: InputWatching!) {
      updateWatching(id: $id, watching: $watching) {
        id
        watching {
          artist
          album
          spotifyId
        }
      }
    }
  `,
}

export const DELETE_WATCHING = {
  definition: 'deleteWatching',
  mutation: gql`
    mutation DeleteWatching($id: ID!, $watchingId: ID!) {
      deleteWatching(id: $id, watchingId: $watchingId) {
        id
        watching {
          artist
          album
          spotifyId
        }
      }
    }
  `,
}
