import gql from 'graphql-tag'

export interface EBayFragments {
  fragments: {
    full: string,
  };
}

export const Ebay: EBayFragments = {
  fragments: {
    full: gql`
      fragment Ebay on Ebay {
        title
        imageUrl
        itemUrl
        itemId
        price
        endTime
        startTimeUnmodified
        endTimeUnmodified
        bids
        postage
        searchResults
        priority
      }
    `,
  },
}

export const READ_EBAY_BY_KEYWORDS = {
  definition: 'readEBayByKeywords',
  query: gql`
    ${Ebay.fragments.full}
    query ReadEBayByKeywords($keywords: String!) {
      readEBayByKeywords(keywords: $keywords) {
        ...Ebay
      }
    }
  `,
}

export const READ_EBAY_BY_FAVOURITES = {
  definition: 'readEBayByFavourites',
  query: gql`
    ${Ebay.fragments.full}
    query ReadEBayByFavourites($id: ID!) {
      readEBayByFavourites(id: $id) {
        ...Ebay
      }
    }
  `,
}
