// @flow
import { Query } from 'react-apollo'
import { READ_ARTIST_RELEASES } from '../../graphQL'
import React, { Component } from 'react'
import { ImageGridSkeleton } from '../presentational/zkeletons'
import { LayoutAnimation } from 'react-native'

type PropTypes = {
  artistReleases: Object,
  state: string | Object,
  loading: Boolean,
}

class ArtistReleases extends Component<PropTypes> {
  static defaultProps = {
    artistReleases: [],
    state: '',
    loading: false,
  }

  updateCache(done) {
    return (prev, { fetchMoreResult }) => {
      if (done) return prev
      const { items } = fetchMoreResult[READ_ARTIST_RELEASES.definition]
      const { items: prevItems } = prev[READ_ARTIST_RELEASES.definition]
      return Object.assign({}, prev, {
        [READ_ARTIST_RELEASES.definition]: {
          ...fetchMoreResult[READ_ARTIST_RELEASES.definition],
          items: [...prevItems, ...items],
        },
      })
    }
  }

  fetchMoreWithVariables(fetchMore, nextOffset, limit, done) {
    const args = {
      variables: { offset: nextOffset, limit },
      updateQuery: this.updateCache(done),
    }
    return () => {
      fetchMore(args)
    }
  }

  render() {
    return (
      <Query
        query={READ_ARTIST_RELEASES.query}
        variables={{ id: this.props.spotifyId, limit: 30, offset: 0 }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, data, fetchMore, networkStatus }) => {
          if (loading && networkStatus === 1) {
            return <ImageGridSkeleton />
          }
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
          const { items, limit, nextOffset, done } = data[
            READ_ARTIST_RELEASES.definition
          ]
          return this.props.children({
            ...this.props,
            artistReleases: items,
            fetchMoreArtistReleases: this.fetchMoreWithVariables(
              fetchMore,
              nextOffset,
              limit,
              done,
            ),
          })
        }}
      </Query>
    )
  }
}

export default ArtistReleases
