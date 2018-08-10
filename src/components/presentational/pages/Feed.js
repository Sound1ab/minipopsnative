// @flow
import React from 'react'
import { FeedContainer } from '../../container'
import { Screen } from '../templates'
import { FlatListWrapper, FlatListItemSearch } from '../atoms'
import { FeedListSkeleton } from '../zkeletons'

export const Feed = () => (
  <FeedContainer>
    {({ loading, id, feed, state }) => (
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
            keyExtractor={(item, index) => `${item.title}-${index}`}
            renderItem={FlatListItemSearch}
          />
        )}
      </Screen>
    )}
  </FeedContainer>
)
