// @flow
import React from 'react'
import { FeedContainer } from '../../container'
import { Screen } from '../templates'
import { FlatListWrapper } from '../atoms'
import { FlatListItemSearch } from '../molecules'
import { FeedListSkeleton } from '../zkeletons'
import { hideTabsOnScroll } from '../../../navigation'

export const Feed = ({ navigator }) => (
  <FeedContainer navigator={navigator}>
    {({ loading, id, feed, state, fetchFeed, refetchFeed }) => (
      <Screen
        navigator={navigator}
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
            onScroll={feed.length > 0 && hideTabsOnScroll(navigator)}
            isTabHidden
          />
        )}
      </Screen>
    )}
  </FeedContainer>
)
