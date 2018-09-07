// @flow
import React, { Fragment } from 'react'
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
      <Screen navigator={navigator}>
        {({ navigateTo }) => (
          <Fragment>
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
                  navigateTo={navigateTo}
                />
              )}
            />
            <Fade isVisible={loading} fadeOut>
              <ImageGridSkeleton />
            </Fade>
          </Fragment>
        )}
      </Screen>
    )}
  </ArtistReleasesContainer>
)
