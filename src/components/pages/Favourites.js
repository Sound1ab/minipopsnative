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
import { FAVOURITES_MACHINE_ACTIONS } from '../../machines/Discovery/actions'

type PropTypes = {}

export const Favourites = (props: PropTypes) => (
  <GrowContainer>
    <Spinner isVisible={props.loading} />
    <NavBar>
      <Heading color="black" size="xl">
        Favourites
      </Heading>
    </NavBar>
    <SwipeListView
      useFlatList
      disableRightSwipe
      closeOnScroll
      recalculateHiddenLayout
      preview={false}
      keyExtractor={item => item.spotifyId}
      data={props.favourites}
      renderItem={({ item, index }) => (
        <FavouritesRow
          index={index}
          key={`${item.artist}-${item.album}`}
          {...item}
        />
      )}
      renderHiddenItem={({ item, index }, rowMap) => (
        <FavouritesRowHidden
          key={`${item.artist}-${item.album}`}
          index={index}
          rowMap={rowMap}
          handlePress={props.removeFromFavourite}
          id={props.id}
          artistAlbum={item}
        />
      )}
      rightOpenValue={-100}
    />
  </GrowContainer>
)

Favourites.defaultProps = {}

const mapStateToProps = state => ({
  loading: state.app.loading,
  favourites: state.discovery.favourites,
  id: state.login.cognitoUser.id,
})

const mapDispatchToProps = dispatch => ({
  removeFromFavourite: payload => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.REMOVE_FAVOURITE(payload))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Favourites)
