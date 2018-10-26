import gql from 'graphql-tag'

export const READ_MARKET_PLACE = {
  definition: 'readMarketPlace',
  query: gql`
    query ReadMarketPlace(
      $artist: String!
      $album: String!
      $keywords: String!
    ) {
      eBay: readEBayByKeywords(keywords: $keywords) {
        title
        imageUrl
        itemUrl
        price
      }
      juno: readMarketPlace(
        marketPlace: "JUNO"
        artist: $artist
        album: $album
      ) {
        title
        image
        link
        price
      }
      discogsMarket: readMarketPlace(
        marketPlace: "DISCOGS_MARKET"
        artist: $artist
        album: $album
      ) {
        title
        image
        link
        price
      }
      vinylTap: readMarketPlace(
        marketPlace: "VINYL_TAP"
        artist: $artist
        album: $album
      ) {
        title
        image
        link
        price
      }
    }
  `,
}
