// @flow
import React from 'react'
import { Dimensions } from 'react-native'
import { CompareContainer } from '../../container'
import { Screen } from '../templates'
import { Fade } from '../zanimations'
import { CompareSkeleton } from '../zkeletons'
import { ScrollViewWrapper } from '../atoms'
import {
  HorizontalSlider,
  ImageWithTitle,
  ActionBar,
  TrackList,
} from '../molecules'

type PropTypes = {
  navigator: {},
  artist: string,
  album: string,
  imageMediumUrl: string,
  discogsProducts: [],
}

export const Compare = ({ navigator, artistAlbum }): PropTypes => (
  <CompareContainer artist={artistAlbum.artist} album={artistAlbum.album}>
    {({
      loading,
      favourites,
      addToFavourites,
      removeFromFavourites,
      addToWatchList,
      removeFromWatchList,
      products,
      watchListIds,
      id,
    }) => (
      <Screen
        isModal
        noLoading
        navigator={navigator}
        loading={loading}
        heading={{
          value: artistAlbum.artist,
          color: 'black',
          size: 'l',
          marginBottom: false,
        }}
      >
        <ScrollViewWrapper>
          <ImageWithTitle
            height={Dimensions.get('window').width}
            source={artistAlbum.imageMediumUrl}
            title={artistAlbum.album}
          />
          <ActionBar
            handleAddToFavourites={addToFavourites.bind(null, {
              id: artistAlbum.spotifyId,
              item: artistAlbum,
            })}
            handleRemoveFromFavourites={removeFromFavourites.bind(null, {
              id: artistAlbum.spotifyId,
              item: artistAlbum,
            })}
            handleAddToWatchList={addToWatchList.bind(null, {
              id: id,
              item: artistAlbum,
            })}
            handleRemoveFromWatchList={removeFromWatchList.bind(null, {
              id: id,
              item: artistAlbum,
            })}
            isFavourite={
              !!favourites.find(
                favourite => favourite.spotifyId === artistAlbum.spotifyId,
              )
            }
            isWatched={watchListIds.includes(artistAlbum.spotifyId)}
          />
          <TrackList tracks={artistAlbum.tracks} />
          <HorizontalSlider
            heading="eBay"
            products={products.eBay}
            loading={loading}
          />
          <HorizontalSlider
            heading="Discogs"
            products={products.discogs}
            loading={loading}
          />
          <HorizontalSlider
            heading="Juno"
            products={products.juno}
            loading={loading}
          />
          <HorizontalSlider
            heading="Vinyl Tap"
            products={products.vinylTap}
            loading={loading}
          />
        </ScrollViewWrapper>
        <Fade isVisible={loading} fadeOut>
          <CompareSkeleton />
        </Fade>
      </Screen>
    )}
  </CompareContainer>
)

Compare.defaultProps = {
  navigator: {},
  artist: '',
  album: '',
  imageMediumUrl: '',
}
