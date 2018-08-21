// @flow
import React from 'react'
import get from 'lodash/get'
import { popScreen } from '../../../navigation'
import { ArtistReleasesContainer } from '../../container'
import { Screen } from '../templates'
import { FlatListItemArtistReleases } from '../molecules'
import { FlatListWrapper } from '../atoms'
import { ImageGridSkeleton } from '../zkeletons'

export const ArtistReleases = ({
  title,
  navigator,
  artistSpotifyId,
  handlePushArtistAlbum,
  fetchMoreArtistReleases,
}) => (
  <ArtistReleasesContainer navigator={navigator}>
    {({ artistReleases, state, loading }) => (
      <Screen
        navigator={navigator}
        loading={loading}
        handleBack={popScreen.bind(null, navigator)}
        state={{
          currentState: state,
          loadingState: 'fetchingReleases',
        }}
        heading={{
          value: title,
          color: 'black',
          size: 'l',
          marginBottom: false,
        }}
      >
        <FlatListWrapper
          data={artistReleases}
          keyExtractor={item =>
            `${get(item[0], ['spotifyId'], '')}-${get(
              item[1],
              ['spotifyId'],
              '',
            )}`
          }
          onEndReached={fetchMoreArtistReleases.bind(null, {
            spotifyId: artistSpotifyId,
          })}
          onEndReachedThreshold={1}
          removeClippedSubviews={true}
          renderItem={({ item, index }) => (
            <FlatListItemArtistReleases
              index={index}
              item={item}
              navigator={navigator}
              handlePress={handlePushArtistAlbum}
            />
          )}
        />
        <ImageGridSkeleton
          isVisible={loading && state === 'fetchingReleases'}
        />
      </Screen>
    )}
  </ArtistReleasesContainer>
)
