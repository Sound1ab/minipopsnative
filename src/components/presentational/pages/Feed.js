// @flow
import React from 'react'
import { FeedContainer } from '../../container'
import { Screen } from '../templates'
import { FlatListWrapper } from '../atoms'
import { FlatListItemSearch } from '../molecules'
import { FeedListSkeleton } from '../zkeletons'
import { hideTabsOnScroll } from '../../../navigation'

const hideTabs = hideTabsOnScroll()

export const Feed = ({ navigator }) => (
  <FeedContainer navigator={navigator}>
    {({ loading, id, feed, state, fetchFeed, refetchFeed, isOnline }) => (
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
            renderItem={props => (
              <FlatListItemSearch {...props} isOnline={isOnline} />
            )}
            onScroll={feed.length > 0 && hideTabs.bind(null, navigator)}
            isTabHidden
          />
        )}
      </Screen>
    )}
  </FeedContainer>
)
