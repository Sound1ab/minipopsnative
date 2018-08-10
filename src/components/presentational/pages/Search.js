// @flow
import React from 'react'
import { Screen } from '../templates'
import { SearchContainer } from '../../container'
import { FlatListWrapper, FlatListItemSearch } from '../atoms/index'

export const Search = () => (
  <SearchContainer>
    {({ loading, searchResults }) => (
      <Screen
        loading={loading}
        heading={{
          value: 'Feed',
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
        />
      </Screen>
    )}
  </SearchContainer>
)
