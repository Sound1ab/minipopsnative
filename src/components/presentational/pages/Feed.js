// @flow
import React from 'react'
import styled from 'styled-components'
import { FeedContainer } from '../../container'
import { hideTabsOnScroll } from '../../../navigation'
import { Screen } from '../templates'
import { FlatListWrapper } from '../atoms'
import { FlatListItemSearch } from '../molecules'
import { FeedListSkeleton } from '../zkeletons'

const hideTabs = hideTabsOnScroll()

const TextStyled = styled.Text`
  margin: 0 16px 16px 16px;
  color: black;
`

const emptyText = 'Favourite some albums to get up to date eBay listings 👌'

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
        <FlatListWrapper
          data={feed}
          refreshing={state === 'refetchingFeed'}
          onRefresh={refetchFeed.bind(null, { id })}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          ListEmptyComponent={() => <TextStyled>{emptyText}</TextStyled>}
          renderItem={props => (
            <FlatListItemSearch {...props} isOnline={isOnline} />
          )}
          onScroll={feed.length > 0 && hideTabs.bind(null, navigator)}
          isTabHidden
        />
        <FeedListSkeleton isVisible={loading && state === 'fetchingFeed'} />
      </Screen>
    )}
  </FeedContainer>
)
