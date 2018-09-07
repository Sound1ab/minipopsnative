// @flow
import React, { Fragment } from 'react'
import { Dimensions, ScrollView } from 'react-native'
import { ArtistAlbumContainer } from '../../container'
import { Screen } from '../templates'
import { ActionBar } from '../molecules'
import { ImageWrapper, TrackRow, TabBarPlaceholder } from '../atoms'
import { ArtistAlbumSkeleton } from '../zkeletons'
import { Fade } from '../zanimations'

export const ArtistAlbum = ({ navigator, spotifyId }) => (
  <ArtistAlbumContainer spotifyId={spotifyId}>
    {({
      loading,
      state,
      artistAlbum,
      id,
      favourites,
      addToFavourites,
      removeFromFavourites,
    }) => (
      <Screen navigator={navigator}>
        {() => (
          <Fragment>
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
                  favourite => favourite.spotifyId === spotifyId,
                )}
              />
              {artistAlbum.tracks.map((track, index) => (
                <TrackRow key={track} index={index}>
                  {`${index + 1}. `}
                  {track}
                </TrackRow>
              ))}
              <TabBarPlaceholder />
            </ScrollView>
            <Fade isVisible={loading} fadeOut>
              <ArtistAlbumSkeleton />
            </Fade>
          </Fragment>
        )}
      </Screen>
    )}
  </ArtistAlbumContainer>
)
