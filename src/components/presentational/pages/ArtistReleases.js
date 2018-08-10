// @flow
import React from 'react'
import { popScreen } from '../../../navigation'
import { ArtistReleasesContainer } from '../../container'
import { Screen } from '../templates'
import { ImageGrid } from '../molecules'
import { ScrollViewWrapper } from '../atoms'
import { ImageGridSkeleton } from '../zkeletons'

export const ArtistReleases = ({
  title,
  navigator,
  artistSpotifyId,
  handlePushArtistAlbum,
  fetchMoreArtistReleases,
}) => (
  <ArtistReleasesContainer>
    {({ artistReleases, state, loading }) => (
      <Screen
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
        <ScrollViewWrapper
          onEndReached={fetchMoreArtistReleases.bind(null, {
            spotifyId: artistSpotifyId,
          })}
        >
          {loading && state === 'fetchingReleases' ? (
            <ImageGridSkeleton />
          ) : (
            <ImageGrid
              navigator={navigator}
              handlePress={handlePushArtistAlbum}
              items={artistReleases}
            />
          )}
        </ScrollViewWrapper>
      </Screen>
    )}
  </ArtistReleasesContainer>
)
