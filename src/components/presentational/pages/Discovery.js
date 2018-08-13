// @flow
import React from 'react'
import { Functional } from '../../../helpers/functional'
import { DiscoveryContainer } from '../../container'
import { Screen } from '../templates'
import { FlatListWrapper } from '../atoms'
import { FlatListItemDiscovery } from '../molecules'

export const Discovery = ({ navigator }) => (
  <DiscoveryContainer>
    {({
      loading,
      discoveryResults,
      handlePushArtistReleases,
      fetchArtistReleases,
    }) => (
      <Screen
        loading={loading}
        heading={{
          value: 'Discovery',
          color: 'black',
          size: 'xl',
          marginBottom: true,
        }}
        searchApi="related-artists"
      >
        <FlatListWrapper
          data={discoveryResults}
          keyExtractor={(item, index) => `${item.title}-${index}`}
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
