// @flow
import React from 'react'
import get from 'lodash/get'
import { popScreen } from '../../../navigation'
import { ArtistReleasesContainer } from '../../container'
import { Screen } from '../templates'
import { FlatListItemArtistReleases } from '../molecules'
import { FlatListWrapper } from '../atoms'
import { ImageGridSkeleton } from '../zkeletons'
import { Fade } from '../zanimations'

export const ArtistReleases = ({ title, spotifyId, navigator }) => (
  <ArtistReleasesContainer navigator={navigator} spotifyId={spotifyId}>
    {({ artistReleases, state, loading, fetchMoreArtistReleases }) => (
      <Screen
        navigator={navigator}
        loading={loading}
        handleBack={popScreen.bind(null, navigator)}
        state={{
          currentState: state.discovery,
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
            spotifyId,
          })}
          onEndReachedThreshold={1}
          removeClippedSubviews={true}
          renderItem={({ item, index }) => (
            <FlatListItemArtistReleases
              index={index}
              item={item}
              navigator={navigator}
            />
          )}
        />
        <Fade
          isVisible={loading && state.discovery === 'fetchingReleases'}
          fadeOut
        >
          <ImageGridSkeleton />
        </Fade>
      </Screen>
    )}
  </ArtistReleasesContainer>
)
