// @flow
import React from 'react'
import { Screen } from '../templates'
import { SearchContainer } from '../../container'
import { FlatListWrapper } from '../atoms'
import { FlatListItemSearch } from '../molecules'
import { hideTabsOnScroll } from '../../../navigation'

export const Search = ({ navigator }) => (
  <SearchContainer navigator={navigator}>
    {({ loading, searchResults }) => (
      <Screen
        loading={loading}
        heading={{
          value: 'Search',
          color: 'black',
          size: 'xl',
          marginBottom: true,
        }}
        searchApi="current-items"
      >
        <FlatListWrapper
          data={searchResults}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={FlatListItemSearch}
          onScroll={searchResults.length > 0 && hideTabsOnScroll(navigator)}
          isTabHidden
        />
      </Screen>
    )}
  </SearchContainer>
)
