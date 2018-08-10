// @flow
import React from 'react'
import { Functional } from '../../../helpers/functional'
import {
  FlatListWrapper,
  FlatListItemDiscovery,
  Heading,
  NavBar,
} from '../atoms/index'
import { SearchField, DiscoveryContainer } from '../../container/index'

export const Discovery = ({ navigator }) => (
  <DiscoveryContainer>
    {({ discoveryResults, handlePushArtistReleases, fetchArtistReleases }) => (
      <React.Fragment>
        <NavBar>
          <Heading color="black" size="xl" marginBottom>
            Discovery
          </Heading>
          <SearchField api="related-artists" />
        </NavBar>
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
        />
      </React.Fragment>
    )}
  </DiscoveryContainer>
)
