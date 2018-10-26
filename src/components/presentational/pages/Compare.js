// @flow
import React, { Fragment } from 'react'
import { Dimensions } from 'react-native'
import { CompareContainer } from '../../container'
import { Screen } from '../templates'
import { Fade } from '../zanimations'
import { CompareSkeleton } from '../zkeletons'
import { ScrollViewWrapper, TabBarPlaceholder } from '../atoms'
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
      id,
      watching,
      updateFavourites,
      deleteFavourites,
      updateWatching,
      deleteWatching,
      junoProducts,
      discogsMarketPlaceProducts,
      vinylTapProducts,
      eBayProducts,
      marketPlaceLoading,
    }) => (
      <Screen navigator={navigator}>
        {({ openUrl }) => (
          <Fragment>
            <ScrollViewWrapper>
              <ImageWithTitle
                height={Dimensions.get('window').width}
                source={artistAlbum.imageMediumUrl}
                title={artistAlbum.album}
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
                    favouriteId: artistAlbum.spotifyId,
                  },
                })}
                handleAddToWatchList={updateWatching.bind(null, {
                  variables: {
                    id: id,
                    watching: {
                      artist: artistAlbum.artist,
                      album: artistAlbum.album,
                      spotifyId: artistAlbum.spotifyId,
                    },
                  },
                })}
                handleRemoveFromWatchList={deleteWatching.bind(null, {
                  variables: {
                    id: id,
                    watchingId: artistAlbum.spotifyId,
                  },
                })}
                isFavourite={
                  !!favourites.find(
                    favourite => favourite.spotifyId === artistAlbum.spotifyId,
                  )
                }
                isWatched={watching
                  .map(watching => watching.spotifyId)
                  .includes(artistAlbum.spotifyId)}
              />
              <TrackList tracks={artistAlbum.tracks} />
              <HorizontalSlider
                openUrl={openUrl}
                heading="eBay"
                products={eBayProducts}
                loading={marketPlaceLoading}
              />
              <HorizontalSlider
                openUrl={openUrl}
                heading="Discogs"
                products={discogsMarketPlaceProducts}
                loading={marketPlaceLoading}
              />
              <HorizontalSlider
                openUrl={openUrl}
                heading="Juno"
                products={junoProducts}
                loading={marketPlaceLoading}
              />
              <HorizontalSlider
                openUrl={openUrl}
                heading="Vinyl Tap"
                products={vinylTapProducts}
                loading={marketPlaceLoading}
              />
              <TabBarPlaceholder />
            </ScrollViewWrapper>
          </Fragment>
        )}
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
