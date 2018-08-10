// @flow
import React from 'react'
import { SearchField, SearchContainer } from '../../container/index'
import {
  FlatListWrapper,
  FlatListItemSearch,
  Heading,
  NavBar,
} from '../atoms/index'

export const Search = () => (
  <SearchContainer>
    {({ searchResults }) => (
      <React.Fragment>
        <NavBar>
          <Heading color="black" size="xl" marginBottom>
            Search
          </Heading>
          <SearchField api="current-items" />
        </NavBar>
        <FlatListWrapper
          data={searchResults}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={FlatListItemSearch}
        />
      </React.Fragment>
    )}
  </SearchContainer>
)
