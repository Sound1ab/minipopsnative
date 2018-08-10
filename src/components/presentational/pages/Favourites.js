// @flow
import React from 'react'
import { SwipeListView } from 'react-native-swipe-list-view'
import { FavouritesContainer } from '../../container'
import { Screen } from '../templates'
import { FavouritesRow, FavouritesRowHidden } from '../molecules'
import { FavouritesListSkeleton } from '../zkeletons'

export const Favourites = () => (
  <FavouritesContainer>
    {({
      loading,
      favourites,
      watchListIds,
      id,
      state,
      removeFromFavourite,
      addToWatchList,
      removeFromWatchList,
    }) => (
      <Screen
        loading={loading}
        heading={{
          value: 'Favourites',
          color: 'black',
          size: 'xl',
          marginBottom: false,
        }}
      >
        {loading && state === 'fetchingFavourites' ? (
          <FavouritesListSkeleton />
        ) : (
          <SwipeListView
            useFlatList
            closeOnScroll
            recalculateHiddenLayout
            preview={false}
            keyExtractor={item => item.spotifyId}
            data={favourites}
            renderItem={({ item, index }) => (
              <FavouritesRow
                {...item}
                index={index}
                key={`${item.artist}-${item.album}`}
                watched={watchListIds.includes(item.spotifyId)}
              />
            )}
            renderHiddenItem={({ item, index }, rowMap) => (
              <FavouritesRowHidden
                key={`${item.artist}-${item.album}`}
                index={index}
                rowMap={rowMap}
                handlePress={removeFromFavourite}
                handleAddToWatchList={addToWatchList}
                handleRemoveFromWatchList={removeFromWatchList}
                id={id}
                artistAlbum={item}
                watched={watchListIds.includes(item.spotifyId)}
              />
            )}
            rightOpenValue={-100}
            leftOpenValue={100}
          />
        )}
      </Screen>
    )}
  </FavouritesContainer>
)

Favourites.defaultProps = {}
