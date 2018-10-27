// @flow
import React from 'react'
import { SwipeListView } from 'react-native-swipe-list-view'
import { FavouritesContainer } from '../../container'
import { Screen } from '../templates/Screen'
import { FavouritesRow, FavouritesRowHidden } from '../molecules'
import { TabBarPlaceholder } from '../atoms'

export const Favourites = ({ navigator }) => (
  <FavouritesContainer navigator={navigator}>
    {({
      favourites,
      watchListIds,
      watching,
      id,
      removeFromFavourite,
      addToWatchList,
      removeFromWatchList,
      isOnline,
      updateWatching,
      deleteWatching,
      deleteFavourites,
    }) => (
      <Screen navigator={navigator}>
        {({ navigateTo }) => (
          <SwipeListView
            useFlatList
            closeOnScroll
            recalculateHiddenLayout
            preview={false}
            keyExtractor={item => item.spotifyId}
            data={favourites}
            ListFooterComponent={TabBarPlaceholder}
            disableLeftSwipe={!isOnline}
            disableRightSwipe={!isOnline}
            renderItem={({ item, index }) => (
              <FavouritesRow
                navigateTo={navigateTo}
                artistAlbum={item}
                index={index}
                key={`${item.artist}-${item.album}`}
                watched={watching
                  .map(watching => watching.spotifyId)
                  .includes(item.spotifyId)}
                isOnline={isOnline}
              />
            )}
            renderHiddenItem={({ item, index }, rowMap) => (
              <FavouritesRowHidden
                key={`${item.artist}-${item.album}`}
                index={index}
                rowMap={rowMap}
                handlePress={deleteFavourites}
                handleAddToWatchList={updateWatching}
                handleRemoveFromWatchList={deleteWatching}
                id={id}
                artistAlbum={item}
                watched={watching
                  .map(watching => watching.spotifyId)
                  .includes(item.spotifyId)}
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
