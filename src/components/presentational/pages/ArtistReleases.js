// @flow
import React from 'react'
import { popScreen } from '../../../navigation/index'
import { Heading, NavBar, ScrollViewWrapper } from '../atoms/index'
import { ImageGrid } from '../molecules/index'
import { ArtistReleasesContainer } from '../../container/index'
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
      <React.Fragment>
        <NavBar handleBack={popScreen.bind(null, navigator)}>
          <Heading color="black" size="l">
            {title}
          </Heading>
        </NavBar>
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
      </React.Fragment>
    )}
  </ArtistReleasesContainer>
)
