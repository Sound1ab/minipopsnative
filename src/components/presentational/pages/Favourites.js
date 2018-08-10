// @flow
import React from 'react'
import { SwipeListView } from 'react-native-swipe-list-view'
import { FavouritesListSkeleton } from '../zkeletons'
import { FavouritesContainer } from '../../container'
import { FavouritesRow, FavouritesRowHidden } from '../molecules'
import { Heading, NavBar } from '../atoms'

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
      <React.Fragment>
        <NavBar>
          <Heading color="black" size="xl">
            Favourites
          </Heading>
        </NavBar>
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
      </React.Fragment>
    )}
  </FavouritesContainer>
)

Favourites.defaultProps = {}
