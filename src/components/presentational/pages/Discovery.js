// @flow
import React from 'react'
import styled from 'styled-components'
import { DiscoveryContainer } from '../../container'
import { Screen } from '../templates'
import { FlatListWrapper } from '../atoms'
import { FlatListItemDiscovery, SearchField } from '../molecules'
import { DiscoveryListSkeleton } from '../zkeletons'

const TextStyled = styled.Text`
  margin: 0 16px 16px 16px;
  color: black;
`

const emptyText = 'Get started finding your favourite albums 🤙'

export const Discovery = ({ navigator }) => (
  <DiscoveryContainer navigator={navigator}>
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
          value: 'Discovery',
          color: 'black',
          size: 'xl',
          marginBottom: false,
        }}
      >
        <FlatListWrapper
          data={searchResults}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          ListEmptyComponent={() => <TextStyled>{emptyText}</TextStyled>}
          ListHeaderComponent={React.createElement(SearchField, {
            searchInput,
            searchEmpty,
            searchValue,
            loading: state && state.search && state.search === 'fetchingSearch',
            api: 'related-artists',
          })}
          renderItem={({ item, index }) => (
            <FlatListItemDiscovery
              item={item}
              index={index}
              navigator={navigator}
            />
          )}
          isTabHidden
        />
        {/*{state &&*/}
        {/*state.search &&*/}
        {/*state.search === 'fetchingSearch' && (*/}
        {/*<DiscoveryListSkeleton*/}
        {/*isVisible={*/}
        {/*state && state.search && state.search === 'fetchingSearch'*/}
        {/*}*/}
        {/*/>*/}
        {/*)}*/}
      </Screen>
    )}
  </DiscoveryContainer>
)
