// @flow
import React from 'react'
import { SwipeListView } from 'react-native-swipe-list-view'
import { FavouritesContainer } from '../../container'
import { Screen } from '../templates'
import { FavouritesRow, FavouritesRowHidden } from '../molecules'
import { TabBarPlaceholder } from '../atoms'
import { FavouritesListSkeleton } from '../zkeletons'
import { Fade } from '../zanimations'

export const Favourites = ({ navigator }) => (
  <FavouritesContainer navigator={navigator}>
    {({
      loading,
      favourites,
      watchListIds,
      id,
      removeFromFavourite,
      addToWatchList,
      removeFromWatchList,
      isOnline,
    }) => (
      <Screen
        navigator={navigator}
        loading={loading}
        heading={{
          value: 'Favourites',
          color: 'black',
          size: 'xl',
          marginBottom: false,
        }}
      >
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
              artistAlbum={item}
              index={index}
              key={`${item.artist}-${item.album}`}
              watched={watchListIds.includes(item.spotifyId)}
              isOnline={isOnline}
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
        <Fade isVisible={loading} fadeOut>
          <FavouritesListSkeleton />
        </Fade>
      </Screen>
    )}
  </FavouritesContainer>
)
