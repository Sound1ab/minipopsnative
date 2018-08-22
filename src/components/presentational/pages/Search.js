// @flow
import React from 'react'
import { Screen } from '../templates'
import { SearchContainer, SearchField } from '../../container'
import { FlatListWrapper } from '../atoms'
import { FlatListItemSearch } from '../molecules'
import { hideTabsOnScroll } from '../../../navigation'

const hideTabs = hideTabsOnScroll()

export const Search = ({ navigator }) => (
  <SearchContainer navigator={navigator}>
    {({ loading, searchValue, searchResults, searchInput, searchEmpty }) => (
      <Screen
        navigator={navigator}
        loading={loading}
        heading={{
          value: 'Search',
          color: 'black',
          size: 'xl',
          marginBottom: false,
        }}
      >
        <FlatListWrapper
          data={searchResults}
          ListHeaderComponent={React.createElement(SearchField, {
            searchInput,
            searchEmpty,
            searchValue,
            api: 'current-items',
          })}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={FlatListItemSearch}
          onScroll={searchResults.length > 0 && hideTabs.bind(null, navigator)}
          isTabHidden
        />
      </Screen>
    )}
  </SearchContainer>
)
