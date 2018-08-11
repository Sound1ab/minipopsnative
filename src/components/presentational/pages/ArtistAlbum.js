// @flow
import React from 'react'
import { Dimensions, ScrollView } from 'react-native'
import { popScreen } from '../../../navigation'
import { ArtistAlbumContainer } from '../../container'
import { Screen } from '../templates'
import { ActionBar, TrackRow } from '../molecules'
import { ImageWrapper } from '../atoms'
import { ArtistAlbumSkeleton } from '../zkeletons'

export const ArtistAlbum = ({ navigator, albumSpotifyId }) => (
  <ArtistAlbumContainer>
    {({
      loading,
      state,
      artistAlbum,
      id,
      favourites,
      addToFavourites,
      removeFromFavourites,
    }) => (
      <Screen
        loading={loading}
        handleBack={popScreen.bind(null, navigator)}
        state={{
          currentState: state,
          loadingState: 'fetchingAlbum',
        }}
        heading={{
          value: artistAlbum.album,
          color: 'black',
          size: 'l',
          marginBottom: false,
        }}
      >
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
      </Screen>
    )}
  </ArtistAlbumContainer>
)
