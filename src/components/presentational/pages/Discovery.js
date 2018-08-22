// @flow
import React from 'react'
import { Functional } from '../../../helpers/functional'
import { DiscoveryContainer } from '../../container'
import { Screen } from '../templates'
import { FlatListWrapper } from '../atoms'
import { FlatListItemDiscovery, SearchField } from '../molecules'

export const Discovery = ({ navigator }) => (
  <DiscoveryContainer navigator={navigator}>
    {({
      state,
      loading,
      searchValue,
      searchResults,
      handlePushArtistReleases,
      fetchArtistReleases,
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
          ListHeaderComponent={React.createElement(SearchField, {
            searchInput,
            searchEmpty,
            searchValue,
            loading: state && state.search && state.search === 'fetchingSearch',
            api: 'related-artists',
          })}
          renderItem={renderProps => (
            <FlatListItemDiscovery
              {...renderProps}
              navigator={navigator}
              handlePushArtistReleases={Functional.compose(
                handlePushArtistReleases,
                fetchArtistReleases,
              )}
            />
          )}
          isTabHidden
        />
      </Screen>
    )}
  </DiscoveryContainer>
)
