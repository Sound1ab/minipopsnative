// @flow
import React from 'react'
import get from 'lodash/get'
import chunk from 'lodash/chunk'
import { ArtistReleasesContainer } from '../../container'
import { Screen, Theme } from '../templates'
import { FlatListItemArtistReleases } from '../molecules'
import { FlatListWrapper } from '../atoms'

const chunkItems = singularItems =>
  chunk(
    singularItems.reduce((a, b) => {
      if (!a.find(v => v.secondaryTitle === b.secondaryTitle)) {
        a = [...a, b]
      }
      return a
    }, []),
    2,
  )

export const ArtistReleases = ({ spotifyId, navigator }) => (
  <Theme navigator={navigator}>
    <ArtistReleasesContainer navigator={navigator} spotifyId={spotifyId}>
      {({ artistReleases, fetchMoreArtistReleases }) => (
        <Screen navigator={navigator}>
          {({ navigateTo }) => (
            <FlatListWrapper
              data={chunkItems(artistReleases)}
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
          )}
        </Screen>
      )}
    </ArtistReleasesContainer>
  </Theme>
)
