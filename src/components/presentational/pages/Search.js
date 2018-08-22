// @flow
import React from 'react'
import { Screen } from '../templates'
import { SearchContainer } from '../../container'
import { FlatListWrapper } from '../atoms'
import { FlatListItemSearch, SearchField } from '../molecules'
import { hideTabsOnScroll } from '../../../navigation'

const hideTabs = hideTabsOnScroll()

export const Search = ({ navigator }) => (
  <SearchContainer navigator={navigator}>
    {({
      state,
      loading,
      searchValue,
      searchResults,
      searchInput,
      searchEmpty,
    }) => (
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
            loading: state === 'fetchingSearch',
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
