// @flow
import React from 'react'
import chunk from 'lodash/chunk'
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
        {loading && state === 'fetchingReleases' ? (
          <ImageGridSkeleton />
        ) : (
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
            renderItem={({ item }) => (
              <FlatListItemArtistReleases
                item={item}
                navigator={navigator}
                handlePress={handlePushArtistAlbum}
              />
            )}
          />
        )}
      </Screen>
    )}
  </ArtistReleasesContainer>
)
