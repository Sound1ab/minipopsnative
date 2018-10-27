// @flow
import React from 'react'
import { Dimensions, ScrollView } from 'react-native'
import { ArtistAlbumContainer } from '../../container'
import { Screen } from '../templates'
import { ActionBar } from '../molecules'
import { ImageWrapper, TrackRow, TabBarPlaceholder } from '../atoms'

export const ArtistAlbum = ({ navigator, spotifyId }) => (
  <ArtistAlbumContainer spotifyId={spotifyId}>
    {({ artistAlbum, id, favourites, updateFavourites, deleteFavourites }) => (
      <Screen navigator={navigator}>
        {() => (
          <ScrollView>
            <ImageWrapper
              source={artistAlbum.imageBigUrl}
              height={Dimensions.get('window').width}
            />
            <ActionBar
              handleAddToFavourites={updateFavourites.bind(null, {
                variables: {
                  id,
                  favourite: artistAlbum,
                },
              })}
              handleRemoveFromFavourites={deleteFavourites.bind(null, {
                variables: {
                  id: id,
                  favouriteId: spotifyId,
                },
              })}
              isFavourite={
                !!favourites.find(
                  favourite => favourite.spotifyId === spotifyId,
                )
              }
            />
            {artistAlbum.tracks.map((track, index) => (
              <TrackRow key={track} index={index}>
                {`${index + 1}. `}
                {track}
              </TrackRow>
            ))}
            <TabBarPlaceholder />
          </ScrollView>
        )}
      </Screen>
    )}
  </ArtistAlbumContainer>
)
