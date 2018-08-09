// @flow
import React from 'react'
import { connect } from 'react-redux'
import { SwipeListView } from 'react-native-swipe-list-view'
import {
  GrowContainer,
  Heading,
  Spinner,
  NavBar,
} from '../presentational/atoms'
import { FavouritesRow, FavouritesRowHidden } from '../presentational/molecules'
import { FavouritesListSkeleton } from '../presentational/skeletons'
import { FAVOURITES_MACHINE_ACTIONS } from '../../machines/Discovery/actions'

type PropTypes = {
  removeFromFavourite: Function,
  addToWatchList: Function,
  removeFromWatchList: Function,
  watchListIds: Array<string>,
}

export const Favourites = (props: PropTypes) => (
  <React.Fragment>
    <NavBar>
      <Heading color="black" size="xl">
        Favourites
      </Heading>
    </NavBar>
    {props.loading && props.state === 'fetchingFavourites' ? (
      <FavouritesListSkeleton />
    ) : (
      <SwipeListView
        useFlatList
        // disableRightSwipe
        closeOnScroll
        recalculateHiddenLayout
        preview={false}
        keyExtractor={item => item.spotifyId}
        data={props.favourites}
        renderItem={({ item, index }) => (
          <FavouritesRow
            {...item}
            index={index}
            key={`${item.artist}-${item.album}`}
            watched={props.watchListIds.includes(item.spotifyId)}
          />
        )}
        renderHiddenItem={({ item, index }, rowMap) => (
          <FavouritesRowHidden
            key={`${item.artist}-${item.album}`}
            index={index}
            rowMap={rowMap}
            handlePress={props.removeFromFavourite}
            handleAddToWatchList={props.addToWatchList}
            handleRemoveFromWatchList={props.removeFromWatchList}
            id={props.id}
            artistAlbum={item}
            watched={props.watchListIds.includes(item.spotifyId)}
          />
        )}
        rightOpenValue={-100}
        leftOpenValue={100}
      />
    )}
  </React.Fragment>
)

Favourites.defaultProps = {}

const mapStateToProps = state => ({
  favourites: state.discovery.favourites,
  watchListIds: state.discovery.watchList.ids,
  id: state.login.cognitoUser.id,
  state: state.app.state,
})

const mapDispatchToProps = dispatch => ({
  removeFromFavourite: payload => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.REMOVE_FAVOURITE(payload))
  },
  addToWatchList: payload => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.ADD_TO_WATCH_LIST(payload))
  },
  removeFromWatchList: payload => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.REMOVE_FROM_WATCH_LIST(payload))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Favourites)
