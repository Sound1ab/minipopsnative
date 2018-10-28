// @flow
import React from 'react'
import styled from 'styled-components'
import { FeedContainer } from '../../container'
import { hideTabsOnScroll } from '../../../navigation'
import { Screen, Theme } from '../templates'
import { FlatListWrapper } from '../atoms'
import { FlatListItemSearch } from '../molecules'

const hideTabs = hideTabsOnScroll()

const TextStyled = styled.Text`
  margin: 16px;
  color: ${({ theme }) => theme.text};
`

const emptyText = 'Favourite some albums to get up to date eBay listings 👌'

export const Feed = ({ navigator }) => (
  <Theme navigator={navigator}>
    <FeedContainer navigator={navigator}>
      {({ loading, id, feed, state, fetchFeed, refetchFeed, isOnline }) => (
        <Screen navigator={navigator}>
          {() => (
            <FlatListWrapper
              data={feed}
              // refreshing={loading}
              // onRefresh={refetch}
              keyExtractor={(item, index) => `${item.title}-${index}`}
              ListEmptyComponent={() => <TextStyled>{emptyText}</TextStyled>}
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
  </Theme>
)
