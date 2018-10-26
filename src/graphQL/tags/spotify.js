import gql from 'graphql-tag'

export const READ_RELATED_ARTISTS = {
  definition: 'readRelatedArtists',
  query: gql`
    query ReadRelatedArtists($artist: String!) {
      readRelatedArtists(artist: $artist) {
        title
        imageUrl
        genres
        itemUrl
        spotifyId
        primary
      }
    }
  `,
}

export const READ_ARTIST_RELEASES = {
  definition: 'readArtistReleases',
  query: gql`
    query ReadArtistReleases($id: ID!, $limit: Int, $offset: Int) {
      readArtistReleases(id: $id, limit: $limit, offset: $offset) {
        nextOffset
        limit
        total
        done
        items {
          title
          secondaryTitle
          imageBigUrl
          imageMediumUrl
          imageSmallUrl
          releaseDate
          spotifyId
          itemUrl
        }
      }
    }
  `,
}

export const READ_ARTIST_ALBUM = {
  definition: 'readArtistAlbum',
  query: gql`
    query ReadArtistAlbum($id: ID!) {
      readArtistAlbum(id: $id) {
        artist
        album
        tracks
        imageBigUrl
        imageMediumUrl
        imageSmallUrl
        spotifyId
        popularity
      }
    }
  `,
}
