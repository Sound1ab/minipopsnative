// @flow
import React from 'react'
import { Dimensions, ScrollView } from 'react-native'
import { popScreen } from '../../../navigation/index'
import { ArtistAlbumContainer } from '../../container/index'
import { ActionBar, TrackRow } from '../molecules/index'
import { NavBar, Heading, ImageWrapper } from '../atoms/index'
import { ArtistAlbumSkeleton, HeadingSkeleton } from '../zkeletons'

export const ArtistAlbum = ({ navigator }) => (
  <ArtistAlbumContainer>
    {({
      loading,
      state,
      artistAlbum,
      id,
      favourites,
      albumSpotifyId,
      addToFavourites,
      removeFromFavourites,
    }) => (
      <React.Fragment>
        <NavBar handleBack={popScreen.bind(null, navigator)}>
          {loading && state === 'fetchingAlbum' ? (
            <HeadingSkeleton />
          ) : (
            <Heading color="black" size="l">
              {artistAlbum.album}
            </Heading>
          )}
        </NavBar>
        {loading && state === 'fetchingAlbum' ? (
          <ArtistAlbumSkeleton />
        ) : (
          <ScrollView>
            <ImageWrapper
              source={artistAlbum.imageBigUrl}
              height={Dimensions.get('window').width}
            />
            <ActionBar
              handleAddToFavourites={addToFavourites.bind(null, {
                id: id,
                item: artistAlbum,
              })}
              handleRemoveFromFavourites={removeFromFavourites.bind(null, {
                id: id,
                item: artistAlbum,
              })}
              isFavourite={favourites.find(
                favourite => favourite.spotifyId === albumSpotifyId,
              )}
            />
            {artistAlbum.tracks.map((track, index) => (
              <TrackRow key={track} index={index}>
                {`${index + 1}. `}
                {track}
              </TrackRow>
            ))}
          </ScrollView>
        )}
      </React.Fragment>
    )}
  </ArtistAlbumContainer>
)
