// @flow
import React from 'react'
import { FeedContainer } from '../../container'
import { Screen } from '../templates'
import { FlatListWrapper, FlatListItemSearch } from '../atoms'
import { FeedListSkeleton } from '../zkeletons'

export const Feed = () => (
  <FeedContainer>
    {({ loading, id, feed, state, fetchFeed, refetchFeed }) => (
      <Screen
        loading={loading}
        heading={{
          value: 'Feed',
          color: 'black',
          size: 'xl',
          marginBottom: false,
        }}
      >
        {loading && state === 'fetchingFeed' ? (
          <FeedListSkeleton />
        ) : (
          <FlatListWrapper
            data={feed}
            refreshing={state === 'refetchingFeed'}
            onRefresh={refetchFeed.bind(null, { id })}
            keyExtractor={(item, index) => `${item.title}-${index}`}
            renderItem={FlatListItemSearch}
          />
        )}
      </Screen>
    )}
  </FeedContainer>
)
