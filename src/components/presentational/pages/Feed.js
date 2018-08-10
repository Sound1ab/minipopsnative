// @flow
import React from 'react'
import { FeedContainer } from '../../container/index'
import {
  Heading,
  NavBar,
  FlatListWrapper,
  FlatListItemSearch,
} from '../atoms/index'
import { FeedListSkeleton } from '../zkeletons'

export const Feed = () => (
  <FeedContainer>
    {({ loading, id, feed, state }) => (
      <React.Fragment>
        <NavBar>
          <Heading color="black" size="xl">
            Feed
          </Heading>
        </NavBar>
        {loading && state === 'fetchingFeed' ? (
          <FeedListSkeleton />
        ) : (
          <FlatListWrapper
            data={feed}
            keyExtractor={(item, index) => `${item.title}-${index}`}
            renderItem={FlatListItemSearch}
          />
        )}
      </React.Fragment>
    )}
  </FeedContainer>
)
